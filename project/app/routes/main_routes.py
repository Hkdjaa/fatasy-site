from flask import Blueprint, render_template

main_bp = Blueprint('main', __name__, url_prefix='')


class MainController:
    """Controller for main site routes."""
    def home(self):
        return render_template('index.html')

    def realms(self):
        return render_template('realms.html')

    def characters(self):
        return render_template('characters.html')

    def artifacts(self):
        return render_template('artifacts.html')

    def prophecy(self):
        return render_template('prophecy.html')

    def gallery(self):
        return render_template('gallery.html')


_controller = MainController()
main_bp.add_url_rule('/', endpoint='home', view_func=_controller.home)
main_bp.add_url_rule('/realms', endpoint='realms', view_func=_controller.realms)
main_bp.add_url_rule('/characters', endpoint='characters', view_func=_controller.characters)
main_bp.add_url_rule('/artifacts', endpoint='artifacts', view_func=_controller.artifacts)
main_bp.add_url_rule('/prophecy', endpoint='prophecy', view_func=_controller.prophecy)
main_bp.add_url_rule('/gallery', endpoint='gallery', view_func=_controller.gallery)
