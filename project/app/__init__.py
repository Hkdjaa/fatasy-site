import os
from flask import Flask


def _get_paths():
    base = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
    templates = os.path.join(base, 'templates')
    static = os.path.join(base, 'static')
    return templates, static


def create_app(config=None):
    templates, static = _get_paths()
    app = Flask(__name__, template_folder=templates, static_folder=static)
    app.config.update(config or {})

    # Register blueprints
    from .routes.main_routes import main_bp
    from .routes.about_routes import about_bp
    from .routes.contact_routes import contact_bp

    app.register_blueprint(main_bp)
    app.register_blueprint(about_bp)
    app.register_blueprint(contact_bp)

    return app


class App:
    """Main application object that encapsulates Flask initialization."""
    def __init__(self, config=None):
        self._config = config or {'DEBUG': True}
        self.app = create_app(self._config)

    def run(self, **kwargs):
        self.app.run(**kwargs)
