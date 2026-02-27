from flask import Blueprint, render_template

about_bp = Blueprint('about', __name__, url_prefix='')


class AboutController:
    def about(self):
        return render_template('about.html')


_ctrl = AboutController()
about_bp.add_url_rule('/about', endpoint='about', view_func=_ctrl.about)
