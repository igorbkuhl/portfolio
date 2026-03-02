import { execSync } from "child_process";
import { readFileSync } from "fs";

const packageFile = readFileSync("package.json", { encoding: "utf8", flag: 'r' });
const jsonFile = JSON.parse(packageFile);
const dependencies = jsonFile.dependencies;
const devDependencies = jsonFile.devDependencies;
const packages = [...Object.keys(dependencies), ...Object.keys(devDependencies)];

packages.forEach(pkg => {
  execSync(`bun install ${pkg}@latest`);
});

/*

extends Node2D

@onready var animBtnA = $UILayer/Buttons/btnA
@onready var sprHands = $sprHands
@onready var lblDirection = $UILayer/Text/lblDirection
@onready var paperQueueObject = $PaperQueue
@onready var camera2d = $Camera2D
@onready var sprGhostCursor = $sprGhostCursor
@onready var lblPoints: Label = $UILayer/Text/lblPoints
@onready var docArea: Area2D = $documentArea

@onready var sprBtnF = $UILayer/Buttons/btnF
@onready var sprBtnW = $UILayer/Buttons/btnW
@onready var sprBtnE = $UILayer/Buttons/btnE

var is_searching = false
var last_key = ""
var currentPosition = -1
var directionUp = true
var paperList = []
var paperQueue = len(paperList)
@onready var sprHandsInitialPosition: Vector2 = sprHands.position

var cursorImg = preload("res://assets/carimbos/carimbo1.png")
var paper = preload("res://scenes/paper_queue.tscn")
var main_paper = preload("res://scenes/main_paper.tscn")

# sounds
@onready var sndPaperWalk: Array[AudioStreamPlayer2D] = [
	$Sounds/sndPaperWalk1,
	$Sounds/sndPaperWalk2,
	$Sounds/sndPaperWalk3,
]
@onready var sndCameraShake: Array[AudioStreamPlayer2D] = [
	$Sounds/sndCameraShake1,
	$Sounds/sndCameraShake2,
]
@onready var sndSelectPaper = $Sounds/sndSelectPaper
@onready var sndStampHit = $Sounds/sndStampHit

func try_move(key: String):
	if key == "W":
		sprBtnE.frame = 1
		sprBtnW.frame = 0
	else:
		sprBtnE.frame = 0
		sprBtnW.frame = 1
	if last_key == key:
		return
	if directionUp and currentPosition < paperQueue - 1:
		currentPosition += 1
		flip_frame(key)
		set_current_paper(currentPosition)
	elif not directionUp and currentPosition > -1:
		currentPosition -= 1
		flip_frame(key)
		set_current_paper(currentPosition)
	sndPaperWalk.pick_random().play()

func _process(_delta: float) -> void:
	sprGhostCursor.position = get_global_mouse_position()

func _unhandled_input(event: InputEvent) -> void:
	if event is InputEventMouseButton and event.is_released():
		match event.button_index:
			MOUSE_BUTTON_LEFT:
				sndStampHit.play()

	if event is InputEventKey and event.pressed and not event.echo:
		handle_input_map(event)

func handle_input_map(event: InputEvent) -> void:
	if event.is_action_pressed("toggle_search"):
		if not is_searching:
			start_searching()
		else:
			stop_searching()
		camera2d.switch_place()

	if not is_searching: return

	if event.is_action_pressed("left_finger"):
		try_move("W")
	elif event.is_action_pressed("right_finger"):
		try_move("E")
	elif event.is_action_pressed("change_hand_direction"):
		directionUp = not directionUp
		lblDirection.rotation_degrees = -lblDirection.rotation_degrees -360
	elif event.is_action_pressed("pick_paper"):
		if previous >= 0:
			# 1. remove paper from queue
			var docType: Global.Doctype = paperList[currentPosition].DocumentType
			paperList[currentPosition].queue_free()
			paperList.remove_at(currentPosition)
			previous = -1
			paperQueue = len(paperList)
			
			organizePaperQueue()

			# 2. instantiate paper coming from the left
			var mainDocument = main_paper.instantiate()
			mainDocument.target_position = Vector2(
				randf_range(docArea.position.x - 20, docArea.position.x + 20),
				randf_range(docArea.position.y - 10, docArea.position.y + 30)
			)
			mainDocument.documentType = docType
			add_child(mainDocument)

			# 3. play sound
			sndSelectPaper.play()
			stop_searching()
			camera2d.switch_place()

func start_searching():
	sndCameraShake.pick_random().play()

	directionUp = true
	is_searching = true
	sprHands.visible = true
	lblDirection.visible = true
	sprGhostCursor.visible = false

	sprHands.stop()
	sprHands.frame = 0
	sprHands.position = sprHandsInitialPosition
	last_key = ""
	lblDirection.rotation = -90
	currentPosition = -1
	
	sprBtnF.visible = true
	sprBtnW.visible = true
	sprBtnE.visible = true

func stop_searching():
	sndCameraShake.pick_random().play()

	sprGhostCursor.visible = true
	is_searching = false
	sprHands.visible = false
	lblDirection.visible = false
	sprBtnF.visible = false
	sprBtnW.visible = false
	sprBtnE.visible = false
	if previous >= 0:
		paperList[previous].selected = false

var previous = -1
func set_current_paper(pos: int):
	if currentPosition == -1:
		sprHands.frame = 0
		return
	if previous >= 0:
		paperList[previous].selected = false
	paperList[pos].selected = true
	previous = pos

func _ready():
	Music.setGameMusic()
	Global.lblPoints = lblPoints
	Global.setCarimbo(Global.Doctype.DOC_BLUE)
	
	sprGhostCursor.z_index = 99
	sprGhostCursor.scale = sprGhostCursor.scale/2
	animBtnA.play("default")
	sprBtnF.visible = false
	sprBtnW.visible = false
	sprBtnE.visible = false

	sprHands.visible = false
	lblDirection.visible = false
	
	# instantiates paper queue
	var acc: Vector2 = paperQueueObject.position
	var zindex = 10
	paperQueue = 10
	for i in range(paperQueue):
		var newPaper = paper.instantiate()
		newPaper.DocumentType = [0, 1, 2].pick_random()
		newPaper.position = acc
		newPaper.z_index  = zindex
		newPaper.set_doctype(randi()%3)
		add_child(newPaper)
		paperList.append(newPaper)
		acc              -= Vector2(0, 10)
		zindex           -= 1

func organizePaperQueue():
	var acc: Vector2 = paperQueueObject.position
	var zindex = 10
	for v in paperList:
		v.position = acc
		v.z_index  = zindex
		acc       -= Vector2(0, 10)
		zindex    -= 1

func flip_frame(key: String):
	last_key = key
	if key == "W":
		sprHands.frame = 3
	elif key == "E":
		sprHands.frame = 2
	var tween = create_tween()
	if directionUp:
		tween.tween_property(sprHands, "position:y", sprHands.position.y - 10, 0.15).set_trans(Tween.TRANS_SINE).set_ease(Tween.EASE_OUT)
	else:
		tween.tween_property(sprHands, "position:y", sprHands.position.y + 10, 0.15).set_trans(Tween.TRANS_SINE).set_ease(Tween.EASE_OUT)

*/
