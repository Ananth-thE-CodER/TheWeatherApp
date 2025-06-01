const images = {};

function importAll(r) {
    r.keys().forEach((key) => {
        const fileName = key.replace('./', '').replace('.png', '');
        images[fileName] = r(key);
    });
}

// This loads all .png files in the assets folder
importAll(require.context('../assets', false, /\.png$/));

// Now `images["clear"]` gives the path to clear.png
export default images;
