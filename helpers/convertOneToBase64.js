export default function(files) {
  return new Promise((resolve, reject) => {
    
    if (!files || !files.length) {
      resolve([]);
    }

    const reader = new FileReader();
    
    reader.onloadend = function(e) {
      resolve(e.target.result)
    }
    
    reader.readAsDataURL(files[0]);

  });
}