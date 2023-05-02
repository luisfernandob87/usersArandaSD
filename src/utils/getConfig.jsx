

const getConfig = () => ({

    
    headers: { Authorization: `${localStorage.getItem("token")}`}
});

export default getConfig;