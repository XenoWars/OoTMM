import React, { useState } from 'react';
import Select from 'react-select';
import { itemName, locationList } from '@ootmm/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

import { useItemPool, useSettings } from '../contexts/GeneratorContext';

export function Plando() {
  const [selectedLoc, setSelectedLoc] = useState<string>();
  const [selectedItem, setSelectedItem] = useState<string>();
  const [settings, setSettings] = useSettings();
  const itemPool = useItemPool();
  const locs = Object.keys(locationList(settings)).sort();
  const locsOptions = locs.map(loc => ({ value: loc, label: loc }));
  const itemOptions = Object.keys(itemPool).map(item => ({ value: item, label: itemName(item) }));

  const placeItem = () => {
    if (selectedItem && selectedLoc) {
      setSettings({ plando: { locations: { [selectedLoc]: selectedItem } }});
    }
  };

  const removeItem = (loc: string) => {
    if (loc) {
      setSettings({ plando: { locations: { [loc]: null } }});
    }
  };

  const removeAll = () => {
    const locations = { ...settings.plando.locations };
    for (const loc of locs) {
      locations[loc] = null;
    }
    setSettings({ plando: { locations }});
  };

  return (
    <div className='plando'>
      <div className='plando-search'>
        <Select className='plando-select' options={locsOptions} onChange={(v) => setSelectedLoc(v?.value)}/>
        <Select className='plando-select' options={itemOptions} onChange={(v) => setSelectedItem(v?.value)}/>
        <button className="btn-primary" onClick={placeItem}>Add</button>
        <button className="btn-danger" onClick={removeAll}>Remove All</button>
      </div>
      <ol className='plando-list'>
        {Object.entries(settings.plando.locations || {}).filter(x => x[1]).map(([loc, item]) => (
          <li key={loc}>
            <span className="plando-remove" onClick={() => removeItem(loc)}><FontAwesomeIcon icon={solid('xmark')}/></span>
            <span className="plando-item">{loc}: {itemName(item!)}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
