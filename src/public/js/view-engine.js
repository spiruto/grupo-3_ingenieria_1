import fs from "fs";

export const getComponent = (componentName) => {
    const fileRoute = `../components/${componentName}`;
    if (fs.existsSync(fileRoute)) {
        const file = fs.readFileSync(fileRoute, { encoding: "utf-8", flag: "r" });
        console.log(file)
        return file;
    }
return null;
};

