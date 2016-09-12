<h5>This is the repository for the <a href="https://addons.mozilla.org/en-US/firefox/addon/autosave-online/">Autosave Online</a> extension. It is currently available in the Mozilla Add-on Gallery. </h5>

This add-on works by injected a script into every webpage and listening for `focus` events bubbled up to the document.  It saves a reference to the targetted element, and waits for `beforeunload` to be fired. Then, it collects the values in those elements and saves them locally.

