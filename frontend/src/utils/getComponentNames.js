// src/utils/getComponentNames.js
export const componentNames = (isAdmin) => {
    // Use require.context to get all .js files from the appropriate components directory
    const context = isAdmin
        ? require.context('../admin/components', false, /\.js$/) // Admin components
        : require.context('../user/components', false, /\.js$/); // User components
    const names = context.keys().map(fileName => fileName.replace('./', '').replace('.js', ''));
    console.log('ALL NAMES: ', names);
    return names;
};
