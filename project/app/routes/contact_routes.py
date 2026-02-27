from flask import Blueprint, render_template, request, flash, redirect, url_for

contact_bp = Blueprint('contact', __name__, url_prefix='')


class ContactController:
    def contact(self):
        return render_template('contact.html')

    def submit(self):
        # lightweight handling: keep behavior minimal to avoid changing UX
        data = request.form.to_dict()
        # In a real app we'd validate and persist; flash a brief message
        flash('Your message has been sent (demo).', 'success')
        return redirect(url_for('contact.contact'))


_ctrl = ContactController()
contact_bp.add_url_rule('/contact', endpoint='contact', view_func=_ctrl.contact, methods=['GET'])
contact_bp.add_url_rule('/contact', endpoint='contact_submit', view_func=_ctrl.submit, methods=['POST'])
