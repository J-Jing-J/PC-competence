export const scrollToBottom = () => {
  (function smoothscroll() {
    const currentScroll = document.documentElement.scrollTop || document.body.scrollTop; // 已经被卷掉的高度
    const clientHeight = document.documentElement.clientHeight; // 浏览器高度
    const scrollHeight = document.documentElement.scrollHeight; // 总高度
    if (scrollHeight - 10 > currentScroll + clientHeight) {
      window.requestAnimationFrame(smoothscroll);
      window.scrollTo(0, currentScroll + (scrollHeight - currentScroll - clientHeight) / 2);
    }
  })();
};