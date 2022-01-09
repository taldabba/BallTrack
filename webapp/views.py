from dns.rdatatype import CNAME
from flask import Blueprint, render_template, request, flash, jsonify, redirect
from flask_login import login_required, current_user
from sqlalchemy.sql.functions import user
from .models import Note
from . import db
import json
from . import courts

views = Blueprint('views', __name__)


@views.route('/', methods=['GET', 'POST'])
@login_required
def home():
    if request.method == 'POST':
        note = request.form.get('note')

        if len(note) < 1:
            flash('Note is too short!', category='error')
        else:
            new_note = Note(data=note, user_id=current_user.id)
            db.session.add(new_note)
            db.session.commit()
            flash('Note added!', category='success')

    return render_template("home.html", user=current_user)


@views.route('/delete-note', methods=['POST'])
def delete_note():
    note = json.loads(request.data)
    noteId = note['noteId']
    note = Note.query.get(noteId)
    if note:
        if note.user_id == current_user.id:
            db.session.delete(note)
            db.session.commit()

    return jsonify({})

@views.route('/show-courts', methods = ['GET'])
@login_required
def show_courts():
    return render_template("courts.html",user=current_user, courts=courts.find())

@views.route('/courts/',methods = ['GET','POST'])
@login_required
def see_court():
    if request.method == 'GET':
        courtName = request.args.get('name')
        

        if courts.find({'name':courtName}).count() == 0:
            return redirect("/show-courts", code=302)
        else:
            court = courts.find_one({'name':courtName})
            return render_template("courtView.html",user=current_user, court=court)
    elif request.method == 'POST':       
        courtName = request.form.get('action')
        courtName = " ".join(courtName.split("%20"))
        
        if not current_user.is_active:
            current_user.is_active = True
            current_user.current_court = courtName
            courts.update_many({"name": courtName}, {"$push":{"players": current_user.id}})


        else:
            current_user.is_active = False
            current_user.current_court = ''
        db.session.commit()
        
        return redirect(f"/courts/?name={courtName}", code=302)

@views.route('/checkout', methods=['GET'])
@login_required
def checkout():
    if request.method == 'GET':
        if current_user.is_active:
            current_user.is_active = False
            current_user.current_court= ''
            db.session.commit()
    return redirect("/show-courts")