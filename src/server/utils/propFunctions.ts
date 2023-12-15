const GetProps = () => {
    const scriptProps = PropertiesService.getScriptProperties();

    return scriptProps.getProperties();
}

export { GetProps };