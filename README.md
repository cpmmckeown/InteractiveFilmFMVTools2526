# 🎬 Interactive FMV Tool – Schema Overview

This project is a web-based authoring tool + runtime player for **interactive films and FMV adventure games** (think *Bandersnatch* meets 1990s CD-ROM games).

The system is driven by a single **JSON schema** that defines the entire project: metadata, branching narrative, video clips, choices, variables, and optional inventory.

---

## 📂 Project Structure

Each project contains:

* A **JSON file** (`project.json`) — the blueprint of the interactive film.
* A **media folder** (`/media/`) — holds all video/audio/image files referenced in the JSON.
* An **exported runtime HTML/JS** file — reads the JSON and plays the experience.

---

## 🧩 JSON Schema

Here’s the breakdown of the schema:

### 1. Project Metadata

```json
"project": {
  "title": "Untitled FMV Project",
  "author": "Anonymous",
  "version": "1.0.0",
  "startScene": "scene_intro",
  "mediaPath": "media/",
  "description": "An interactive film with branching narrative."
}
```

* **title** — project name.
* **author** — creator credit.
* **version** — version tag.
* **startScene** — the entry point for the runtime player.
* **mediaPath** — relative folder for assets.
* **description** — optional notes.

---

### 2. Variables (State Tracking)

```json
"variables": {
  "exampleFlag": false,
  "exampleCounter": 0,
  "playerName": "Agent"
}
```

* Stores **global state** (booleans, numbers, strings).
* Used for **conditions** and **effects** on choices.

---

### 3. Inventory (Optional)

```json
"inventory": [
  {
    "id": "badge",
    "name": "FBI Badge",
    "description": "Proof of your authority.",
    "icon": "badge.png"
  }
]
```

* Defines items that can be gained/used.
* Each has an **id**, **name**, **description**, and optional **icon**.

---

### 4. Scenes

```json
"scenes": [
  {
    "id": "scene_intro",
    "video": "intro.mp4",
    "audio": null,
    "description": "Opening scene.",
    "choices": [...],
    "timer": { "duration": 10, "defaultChoice": "choice_return" }
  }
]
```

* **id** — unique key.
* **video** — clip file.
* **audio** (optional) — background sound/music.
* **description** — editor notes.
* **choices** — player options.
* **timer** — optional timed decision mechanic.

---

### 5. Choices

```json
{
  "id": "choice_follow",
  "label": "Follow the suspect",
  "next": "scene_alley",
  "conditions": [],
  "effects": { "exampleCounter": "+1" }
}
```

* **id** — unique choice ID within a scene.
* **label** — text shown to the player.
* **next** — target scene ID.
* **conditions** — array of requirements (e.g. `"hasBadge == true"`).
* **effects** — state changes when chosen (e.g. `+1`, `true`, `"stringValue"`).

---

### 6. Timers (Optional)

```json
"timer": {
  "duration": 10,
  "defaultChoice": "choice_return"
}
```

* **duration** — seconds before auto-choice.
* **defaultChoice** — ID of choice that triggers if time runs out.

---

## 🚀 Roadmap

1. **Runtime MVP**

   * Play video + render choices.
   * Support simple branching (`next`).

2. **State Logic**

   * Add variables, conditions, and effects.

3. **Advanced Features**

   * Inventory UI.
   * Timers for decisions.
   * Background audio.

4. **Authoring Tool**

   * Start with JSON editor + validator.
   * Add GUI for editing scenes/choices.
   * Future: Twine-like graph view.

---

## ✨ Why JSON First?

* Keeps the system **modular**: one schema → many tools (runtime, editor, exporters).
* Ensures **reusability**: projects can be saved, reopened, and edited later.
* Makes it **portable**: one HTML + JSON + media folder = standalone game.

---

💡 **Tip for contributors**: Always validate your `project.json` before export — malformed IDs, missing videos, or broken `next` references will break playback.

 
