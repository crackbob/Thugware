export default {
    deleteCookie(name) {
        const hostname = location.hostname;
        const parts = hostname.split(".");
        for (let i = 0; i < parts.length; i++) {
            const domain = "." + parts.slice(i).join(".");
            document.cookie = `${encodeURIComponent(name)}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${domain}`;
        }
    }
};