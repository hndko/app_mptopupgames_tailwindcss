/**
 * Pipeline runner untuk menjalankan multiple route middleware secara berurutan.
 */
export function runMiddlewarePipeline(context, middlewareList, index = 0) {
  const nextMiddleware = middlewareList[index];

  if (!nextMiddleware) {
    return context.next();
  }

  return nextMiddleware({
    ...context,
    next: (...args) => {
      // Jika middleware mengembalikan pengalihan (redirect), teruskan langsung ke router.next()
      if (args.length > 0) {
        return context.next(...args);
      }
      // Jika lolos tanpa parameter, lanjutkan ke middleware berikutnya dalam pipeline
      return runMiddlewarePipeline(context, middlewareList, index + 1);
    }
  });
}
