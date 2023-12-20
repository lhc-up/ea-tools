const { execSync, spawnSync } = require('child_process');
const platform = require('os').platform();

// windows系统
const getWin32PortHolder = (port: number) => {
    return new Promise((resolve, reject) => {
        const cmd = `netstat -aon | findstr ${port}`;
        try {
            const stdout = execSync(cmd);
            const portInfo = stdout.toString().trim().split(/\s+/);
            const pId = portInfo[portInfo.length - 1];
            const processStdout = execSync(`tasklist | findstr ${pId}`);
            const [pName] = processStdout.toString().trim().split(/\s+/);
            resolve({
                pId,
                pName
            });
        } catch (error) {
            resolve({});
        }
    });
};

// 类UNIX系统
const getUnixPortHolder = (port: number) => {
    return new Promise((resolve, reject) => {
        try {
            const { stdout, stderr } = spawnSync('lsof', ['-i', `tcp:${port}`]);
            if (stderr.toString()) return reject(stderr.toString());
            if (!stdout.toString()) return resolve({});
            const [pName, pId] = stdout
                .toString()
                .trim()
                .split(/\n/)[1]
                .split(/\s+/);
            resolve({
                pId,
                pName
            });
        } catch (error) {
            resolve({});
        }
    });
};

// 查看端口被哪个进程占用
export const getPortHolder = (port: number): Promise<any> => {
    return platform === 'win32'
        ? getWin32PortHolder(port)
        : getUnixPortHolder(port);
};
