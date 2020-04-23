export const readLocalFile = (file, parser) => {
  const reader = new FileReader();
  return new Promise((resolve, reject) => {
    reader.onload = (event) => {
      const result = (parser && typeof parser === 'function')
        ? parser(event.target.result)
        : event.target.result;
      resolve(result);
    };
    reader.onerror = reject;
    reader.readAsText(file)
  });
};
