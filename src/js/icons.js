function plugin(Skit) {

    if (plugin.installed) {
        return;
    }

    Skit.icon.add(ICONS);

}

if (typeof window !== 'undefined' && window.Skit) {
    window.Skit.use(plugin);
}

export default plugin;
