import React, { useState, useEffect } from "react";
// import Spinner from "@/components/Spinner";
import styles from "./style.module.scss";
import Navbar from "../Navbar";
import { motion } from "framer-motion";
import { getSettings } from "@/Utils/settings";
import SettingsPage from "../SettingsPage";
import { usePathname } from "next/navigation";
import Head from "next/head";
import { useRouter } from "next/navigation";
const Layout = ({ children }: any) => {
  const [theme, setTheme] = useState("system");
  const [mode, setMode] = useState("liquidate");
  const [ascent_color, setAscent_color] = useState("gold");
  const [themeColor, setThemeColor] = useState<any>();
  const { push } = useRouter();
  useEffect(() => {
    const values = getSettings();
    if (values !== null) {
      setTheme(values?.theme);
      setMode(values?.mode);
      setAscent_color(values?.ascent_color);
    }
    console.log({ values });
    const prefersDarkMode =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    const themeColor = prefersDarkMode ? "#1b1919" : "#f4f7fe";
    setThemeColor(themeColor);
    // console.log({ prefersDarkMode });
    // const metaThemeColor = document.querySelector("meta[name=theme-color]");
    // metaThemeColor?.setAttribute("content", themeColor);
  }, []);
  useEffect(() => {
    document.documentElement.style.setProperty("--ascent-color", ascent_color);
    document.documentElement.style.setProperty("--mode", mode);

    window.addEventListener("keydown", (event) => {
      if (event.ctrlKey && event.key === "k") {
        event.preventDefault();
        push("/search");
      }
    });
  }, [mode, ascent_color]);
  const path = usePathname();
  return (
    <>
      {mode === "dark" && (
        <Head>
          <meta name="theme-color" content="#1b1919" />
        </Head>
      )}
      {mode === "light" && (
        <Head>
          <meta name="theme-color" content="#f4f7fe" />
        </Head>
      )}
      {mode === "system" && (
        <Head>
          <meta name="theme-color" content={`${themeColor}`} />
        </Head>
      )}
      <div
        className={`${styles.background} ${mode === "dark" && "dark"} ${mode === "light" && "light"}`}
      >
        <Navbar />
        <motion.div
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 300, opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
        >
          {children}
        </motion.div>
        {path === "/settings" ? (
          <SettingsPage
            mode={mode}
            theme={theme}
            ascent_color={ascent_color}
            setMode={setMode}
            setTheme={setTheme}
            setAscent_color={setAscent_color}
          />
        ) : null}
      </div>
    </>
  );
};

export default Layout;
