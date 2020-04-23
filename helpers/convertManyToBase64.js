export default function(files) {
  return new Promise((resolve, reject) => {
    const base64s = [];
    
    if (!files || !files.length) {
      resolve([]);
    }

    Object.values(files[0]).forEach(file => {
      const reader = new FileReader();
      
      reader.onloadend = function(e) {
        base64s.push(e.target.result);

        if (Object.values(files[0]).length === base64s.length) {
          resolve(base64s);
        }
      }
      
      reader.readAsDataURL(file);

    });
  });
}