export const clearAllCookies = () => {
  document.cookie.replace(/(?<=^|;).+?(?==|;|$)/g, (name) =>
    window.location.hostname
      .split(/\.(?=[^.]+\.)/)
      .map((domain) => (domain.startsWith("localhost") ? domain : `.${domain}`))
      .map(
        (domain) =>
          (document.cookie = `${name}=;max-age=0;path=/;domain=${domain}`)
      )
  );
};
