export type Theme = "light" | "dark" | "system";

export const setTheme = (theme: Theme) => {
    const root = document.documentElement;

    if(theme == "dark"){
        root.classList.add("dark");
        localStorage.setItem("theme", "dark");
    }else if(theme == "light"){
        root.classList.remove("dark");
        localStorage.setItem("theme", "light");
    }else{
        // System
        localStorage.removeItem("theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        if(prefersDark) root.classList.add("dark");
        else root.classList.remove("dark");
    }
};

export const initTheme = ()=> {
    const savedTheme = localStorage.getItem("theme") as Theme | null;

    if(savedTheme === "dark"){
        document.documentElement.classList.add("dark");
    }else if(savedTheme === "light"){
        document.documentElement.classList.remove("dark");
    }else{
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        if(prefersDark) document.documentElement.classList.add("dark");
    }
};

