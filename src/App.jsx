import { useState } from "react";

import classes from "./data/class.json";
import weapons from "./data/weapons.json";
import armor from "./data/armors.json";
import rings from "./data/rings.json";
import spells from "./data/spells.json";

import { soulsNeeded } from "./utils/souls";
import { calculateLevel } from "./utils/level";
import { getEquipment, getRoll } from "./utils/equipment";
import { getSpellSlots } from "./utils/attunement";

import "./App.css";

export default function App() {
  function createPlayer(c) {
    return {
      class: c,

      level: c.level,

      baseStats: {
        ...c.stats,
      },

      stats: {
        ...c.stats,
      },

      weapon: null,

      armor: {
        head: null,
        body: null,
        hands: null,
        legs: null,
      },

      rings: [],

      spells: [],
    };
  }

  const [player, setPlayer] = useState(createPlayer(classes[0]));

  function changeClass(e) {
    const c = classes.find((x) => x.name === e.target.value);

    setPlayer(createPlayer(c));
  }

  function changeStat(stat, value) {
    setPlayer({
      ...player,

      stats: {
        ...player.stats,

        [stat]: Number(value),
      },
    });
  }

  function equipWeapon(e) {
    const weapon = weapons.find((w) => w.name === e.target.value);

    setPlayer({
      ...player,

      weapon,
    });
  }

  function equipArmor(slot, e) {
    const item = armor.find((a) => a.name === e.target.value);

    setPlayer({
      ...player,

      armor: {
        ...player.armor,

        [slot]: item,
      },
    });
  }

  function addRing(e) {
    const ring = rings.find((r) => r.name === e.target.value);

    if (!ring) return;

    if (player.rings.length >= 4) return;

    setPlayer({
      ...player,

      rings: [...player.rings, ring],
    });
  }

  function addSpell(e) {
    const spell = spells.find((s) => s.name === e.target.value);

    if (!spell) return;

    const slots = getSpellSlots(player.stats.attunement || 0);

    if (player.spells.length >= slots) return;

    setPlayer({
      ...player,

      spells: [...player.spells, spell],
    });
  }

  function removeSpell(i) {
    setPlayer({
      ...player,

      spells: player.spells.filter((_, index) => index !== i),
    });
  }

  const level = calculateLevel(player);

  const souls = soulsNeeded(player.level, level);

  const equipment = getEquipment(player.armor);

  const roll = getRoll(equipment.weight, player.stats.endurance);

  const spellSlots = getSpellSlots(player.stats.attunement || 0);

  return (
    <div className="app">
      <h1>Dark Souls Build Planner</h1>
      <div className="status">
        <h2>Level: {level}</h2>
        <p>
          Souls necessárias:
          <b>{souls.toLocaleString()}</b>
        </p>

        <p>
          Weight:
          <b>{equipment.weight.toFixed(1)}</b>
        </p>

        <p>
          Poise:
          <b>{equipment.poise}</b>
        </p>

        <p>
          Roll:
          <b>{roll}</b>
        </p>
      </div>

      <div className="grid">
        <div className="card">
          <h2>Classe</h2>

          <select onChange={changeClass}>
            {classes.map((c) => (
              <option key={c.name}>{c.name}</option>
            ))}
          </select>

          <h2>Stats</h2>

          {Object.entries(player.stats).map(([stat, value]) => (
            <div className="stat" key={stat}>
              <label>{stat}</label>

              <input
                type="number"
                value={value}
                onChange={(e) => changeStat(stat, e.target.value)}
              />
            </div>
          ))}
        </div>

        <div className="card">
          <h2>Weapon</h2>

          <select onChange={equipWeapon}>
            <option>Escolher arma</option>

            {weapons.map((w) => (
              <option key={w.name}>{w.name}</option>
            ))}
          </select>

          <h2>Armor</h2>

          {["head", "body", "hands", "legs"].map((slot) => (
            <div key={slot}>
              <label>{slot}</label>

              <select onChange={(e) => equipArmor(slot, e)}>
                <option>Escolher</option>

                {armor
                  .filter((a) => a.slot === slot)
                  .map((a) => (
                    <option key={a.name}>{a.name}</option>
                  ))}
              </select>
            </div>
          ))}

          <h2>Rings</h2>

          <select onChange={addRing}>
            <option>Adicionar ring</option>

            {rings.map((r) => (
              <option key={r.name}>{r.name}</option>
            ))}
          </select>

          {player.rings.map((r) => (
            <p key={r.name}>💍 {r.name}</p>
          ))}
        </div>

        <div className="card">
          <h2>Spells</h2>

          <p>
            Slots:
            {spellSlots}
          </p>

          <select onChange={addSpell}>
            <option>Adicionar spell</option>

            {spells.map((s) => (
              <option key={s.name}>{s.name}</option>
            ))}
          </select>

          {player.spells.map((s, i) => (
            <p key={s.name}>
              ✨ {s.name}
              <button onClick={() => removeSpell(i)}>X</button>
            </p>
          ))}
        </div>

        <div className="card">
          <h2>Build Final</h2>

          <p>
            Classe:
            {player.class.name}
          </p>

          <p>
            Level:
            {level}
          </p>

          <h3>Weapon</h3>

          <p>{player.weapon?.name || "-"}</p>

          <h3>Armor</h3>

          {Object.entries(player.armor).map(([slot, item]) => (
            <p key={slot}>
              {slot}: {item?.name || "-"}
            </p>
          ))}

          <h3>Stats</h3>

          {Object.entries(player.stats).map(([s, v]) => (
            <p key={s}>
              {s}: {v}
            </p>
          ))}

          <h3>Equipment</h3>

          <p>Weight: {equipment.weight.toFixed(1)}</p>

          <p>Poise: {equipment.poise}</p>

          <p>Roll: {roll}</p>

          <h3>Spells</h3>

          {player.spells.map((s) => (
            <p key={s.name}>✨ {s.name}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
