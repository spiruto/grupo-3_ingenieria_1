
export const getComponent = async (componentName) => {
    const fileRoute = `../../../components/${componentName}.html`;
    const file = await (await fetch(fileRoute)).text();
    if (file) {
        return file;
    }
    return null;
};

