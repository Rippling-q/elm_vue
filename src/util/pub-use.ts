
export default function usePub() {
    const getAssetsFile = (url: string) => {
        return new URL(`../assets/Img/${url}`, import.meta.url).href;
    };

    return {
        getAssetsFile,
    };
}
