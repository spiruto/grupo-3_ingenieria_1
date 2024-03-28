
export const getComponent = async (componentName) => {
    const fileRoute = `../../../components/${componentName}.html`;
    const file = await (await fetch(fileRoute)).text();
    if (file) {
        console.log(file)
        return file;
    }
    return null;
};
