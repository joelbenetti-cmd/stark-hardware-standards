import { Fastener } from '../types';

const rawData: any[][] = [
  ["STD-SC-0042", "Delta screw", "Self tapping screw", "Ø2.5", 10, "Pan head", "Torx T8", "Steel", "-", "-", "Plastic parts", "Delta screw for plastic"],
  ["STD-SC-0001", "Nylon screw", "Machine screw", "M3", 6, "Pan head", "-", "Nylon", "-", "-", "Plastic screw", "Plastic screw"],
  ["STD-SC-0010", "CELO Reform II HS", "Self tapping screw", "M3", 12, "Pan head", "-", "Zn Black steel", "-", "-", "Reform screw", "Reform screw"],
  ["I14583-030008-27", "ISO 14583", "Machine screw", "M3", 8, "Countersunk", "Torx", "Stainless A2-70", "A2-70", "-", "-", "-"],
  ["I14580-030010-27", "ISO 14580", "Machine screw", "M3", 10, "Low head", "Torx", "Stainless A2-70", "A2-70", "-", "-", "-"],
  ["D6900-01-030010-27", "DIN 6900-01", "Machine screw", "M3", 10, "Low head with flange", "Torx", "Stainless A2-70", "A2-70", "-", "-", "-"],
  ["I14580-030016-27", "ISO 14580", "Machine screw", "M3", 16, "Low head", "Torx", "Stainless A2-70", "A2-70", "-", "-", "-"],
  ["STD-SC-0035", "BN 20097 / WN1452", "Pan head screw", "K30", 10, "Pan head", "T7", "Steel", "-", "-", "-", "Replaced by STD-SC-0036"],
  ["I14580-040008-27", "ISO 14580", "Machine screw", "M4", 8, "Low head", "Torx", "Stainless A2-70", "A2-70", "-", "-", "-"],
  ["D6900-01-040008-27", "DIN 6900-01", "Machine screw", "M4", 8, "Low head with flange", "Torx", "Stainless A2-70", "A2-70", "-", "-", "-"],
  ["I14580-040012-08", "ISO 14580", "Machine screw", "M4", 12, "Low head", "Torx", "Steel 8.8", "8.8", "-", "-", "-"],
  ["STD-SC-0048", "Special", "Machine screw", "M4", 12, "Large head", "Torx T25", "Stainless A2-80", "A2-80", "-", "-", "Variant of ISO14580"],
  ["I14580-040016-27", "ISO 14580", "Machine screw", "M4", 16, "Low head", "Torx", "Stainless A2-70", "A2-70", "-", "-", "-"],
  ["I14580-040016-27-P01", "ISO 14580", "Machine screw", "M4", 16, "Low head", "Torx", "Stainless A2-70", "A2-70", "Precote", "-", "Precote"],
  ["D6900-01-040016-27", "DIN 6900-01", "Machine screw", "M4", 16, "Flanged head", "Torx", "Stainless A2-70", "A2-70", "-", "-", "-"],
  ["I14583-040016-27", "ISO 14583", "Machine screw", "M4", 16, "Countersunk", "Torx", "Stainless A2-70", "A2-70", "-", "-", "-"],
  ["I14583-040018-27", "ISO 14583", "Machine screw", "M4", 18, "Countersunk", "Torx", "Stainless A2-70", "A2-70", "-", "-", "-"],
  ["I14580-040035-27", "ISO 14580", "Machine screw", "M4", 35, "Low head", "Torx", "Stainless A2-70", "A2-70", "-", "-", "-"],
  ["I14580-040035-27-P01", "ISO 14580", "Machine screw", "M4", 35, "Low head", "Torx", "Stainless A2-70", "A2-70", "Precote", "-", "Precote"],
  ["I14580-040045-27", "ISO 14580", "Machine screw", "M4", 45, "Low head", "Torx", "Stainless A2-70", "A2-70", "-", "-", "-"],
  ["STD-SC-0020", "Delta screw", "Self tapping", "Ø5", 8, "Pan head", "Torx T25", "Zn Black", "-", "-", "Plastic screw", "Plastic screw"],
  ["STD-SC-0014", "Delta screw", "Self tapping", "Ø5", 20, "Pan head", "Torx T25", "Zn Black", "-", "-", "Plastic screw", "Plastic screw"],
  ["I14580-050008-08", "ISO 14580", "Machine screw", "M5", 8, "Low head", "Torx", "Steel 8.8", "8.8", "-", "-", "-"],
  ["I7380-050010-27", "ISO 7380", "Button head", "M5", 10, "Button", "Hex", "Stainless A2-70", "A2-70", "-", "Obsolete", "Obsolete"],
  ["I14580-050010-27", "ISO 14580", "Machine screw", "M5", 10, "Low head", "Torx", "Stainless A2-70", "A2-70", "-", "-", "-"],
  ["D6900-01-050010-27", "DIN 6900-01", "Machine screw", "M5", 10, "Flanged head", "Torx", "Stainless A2-70", "A2-70", "-", "-", "-"],
  ["I14580-050012-08", "ISO 14580", "Machine screw", "M5", 12, "Low head", "Torx", "Steel 8.8", "8.8", "-", "-", "-"],
  ["I14580-050012-27", "ISO 14580", "Machine screw", "M5", 12, "Low head", "Torx", "Stainless A2-70", "A2-70", "-", "-", "-"],
  ["I14581-050012-08", "ISO 14581", "Machine screw", "M5", 12, "Countersunk", "Torx", "Steel 8.8", "8.8", "-", "-", "-"],
  ["I14583-050012-48", "ISO 14583", "Machine screw", "M5", 12, "Countersunk", "Torx", "Stainless A4-80", "A4-80", "-", "-", "-"],
  ["D6900-01-050012-27", "DIN 6900-01", "Machine screw", "M5", 12, "Flanged head", "Torx", "Stainless A2-70", "A2-70", "-", "-", "-"],
  ["STD-SC-0028", "Design bolt", "Bolt", "M5", 12, "Custom head", "Torx", "Steel", "-", "-", "-", "Used with washer STD-WA-0007"],
  ["BN1392-050012-12", "BN 1382", "Bolt", "M5", 12, "Hex", "Hex", "Steel 12.9", "12.9", "-", "-", "-"],
  ["I7380T-050016-08", "ISO 7380", "Button head", "M5", 16, "Button", "Torx", "Steel 8.8", "8.8", "-", "-", "-"],
  ["I14580-050016-08", "ISO 14580", "Machine screw", "M5", 16, "Low head", "Torx", "Steel 8.8", "8.8", "-", "-", "-"],
  ["I14580-050020-08", "ISO 14580", "Machine screw", "M5", 20, "Low head", "Torx", "Steel 8.8", "8.8", "-", "-", "-"],
  ["STD-SC-0029", "Design bolt", "Bolt", "M5", 22, "Custom head", "Torx T25", "Steel", "-", "-", "-", "-"],
  ["STD-SC-0030", "Design bolt", "Bolt", "M5", 40, "Custom head", "Torx T25", "Steel", "-", "-", "-", "-"],
  ["STD-SC-0031", "Design bolt", "Bolt", "M5", 59, "Custom head", "Torx T25", "Steel", "-", "-", "-", "-"],
  ["STD-SC-0019", "Delta screw", "Self tapping", "Ø6", 12, "Pan head", "Torx T30", "Zn Black", "-", "-", "-", "-"],
  ["STD-SC-0003", "Collar bolt", "Bolt", "M6", 6, "Collar head", "Torx T30", "Steel", "-", "-", "-", "-"],
  ["I14580-060008-08", "ISO 14580", "Machine screw", "M6", 8, "Low head", "Torx", "Steel 8.8", "8.8", "-", "-", "-"],
  ["BN20146-060012-28", "BN 20146", "Bolt", "M6", 12, "Hex", "Hex", "Stainless A2-80", "A2-80", "-", "-", "-"],
  ["STD-SC-0004", "Collar bolt", "Bolt", "M6", 12.5, "Collar", "Torx T30", "Steel", "-", "-", "-", "-"],
  ["I14580-060012-08-P", "ISO 14580", "Machine screw", "M6", 12, "Low head", "Torx", "Steel 8.8", "8.8", "Precote", "-", "Precote"],
  ["I14580-060012-27", "ISO 14580", "Machine screw", "M6", 12, "Low head", "Torx", "Stainless A2-70", "A2-70", "-", "-", "-"],
  ["D6900-01-060012-27", "DIN 6900-01", "Machine screw", "M6", 12, "Flanged", "Torx", "Stainless A2-70", "A2-70", "-", "-", "-"],
  ["STD-SC-0041", "Delta screw", "Self tapping", "Ø6", 14, "Pan head", "Torx T30", "-", "-", "-", "-", "-"],
  ["STD-SC-0016", "Flange screw", "Machine screw", "M6", 16, "Flange", "Torx + Hex", "-", "-", "-", "-", "-"],
  ["I14580-060016-08", "ISO 14580", "Machine screw", "M6", 16, "Low head", "Torx", "Steel 8.8", "8.8", "-", "-", "-"],
  ["STD-SC-0040", "Delta screw", "Self tapping", "Ø6", 18, "Pan head", "Torx T30", "Stainless", "-", "-", "-", "-"],
  ["I14580-060020-08", "ISO 14580", "Machine screw", "M6", 20, "Low head", "Torx", "Steel 8.8", "8.8", "-", "-", "-"],
  ["I7380T-060020-08", "ISO 7380", "Button head", "M6", 20, "Button", "Torx", "Steel 8.8", "8.8", "-", "-", "-"],
  ["I14581-060020-08", "ISO 14581", "Machine screw", "M6", 20, "Countersunk", "Torx", "Steel 8.8", "8.8", "-", "-", "-"],
  ["STD-SC-0007", "Collar bolt", "Bolt", "M6", 32, "Collar", "Torx T30", "Steel", "-", "-", "Seat clamp", "Seat clamp"],
  ["STD-SC-0008", "Collar bolt", "Bolt", "M8", 10, "Collar", "Torx T45", "-", "-", "-", "-", "-"],
  ["I14580-080020-08", "ISO 14580", "Machine screw", "M8", 20, "Low head", "Torx", "Steel 8.8", "8.8", "-", "-", "-"],
  ["BN20146-060020-28", "BN 20146", "Bolt", "M8", 20, "Hex", "Hex", "Stainless A2", "A2", "-", "-", "-"],
  ["STD-SC-0009", "Countersunk screw", "Machine screw", "M8", 24, "Countersunk", "Torx T45", "-", "-", "-", "-", "-"],
  ["I14580-080025-08", "ISO 14580", "Machine screw", "M8", 25, "Low head", "Torx", "Steel 8.8", "8.8", "-", "-", "-"],
  ["I14580-080030-08", "ISO 14580", "Machine screw", "M8", 30, "Low head", "Torx", "Steel 8.8", "8.8", "-", "-", "-"],
  ["I14583-080030-10", "ISO 14583", "Machine screw", "M8", 30, "Countersunk", "Torx", "Steel 10.9", "10.9", "-", "-", "-"],
  ["I14580-080035-08", "ISO 14580", "Machine screw", "M8", 35, "Low head", "Torx", "Steel 8.8", "8.8", "-", "-", "-"],
  ["I14580-080040-08", "ISO 14580", "Machine screw", "M8", 40, "Low head", "Torx", "Steel 8.8", "8.8", "-", "-", "-"],
  ["STD-SC-0017", "Flange bolt", "Bolt", "M10", 30, "Flange", "Torx + Hex", "-", "-", "-", "-", "-"],
  ["I14580-100035-08", "ISO 14580", "Machine screw", "M10", 35, "Low head", "Torx", "Steel 8.8", "8.8", "-", "-", "-"],
  ["STD-SC-0034", "Special bolt", "Bolt", "M10x1.25", 55, "Special", "-", "Steel", "-", "-", "-", "Thread length 28mm"],
  ["SMX1-SR-RA-09", "Shock bolt", "Bolt", "M10", 0, "Custom", "-", "Steel", "-", "-", "Suspension shock", "Suspension shock"],
  ["SMX1-F-A-06", "Sideplate bolt", "Bolt", "M10", 27, "Collar bolt", "-", "Steel", "-", "-", "33mm collar", "33mm collar"],
  ["SMX1-F-A-13", "Battery bolt", "Bolt", "M10", 25, "Hex", "-", "Steel 10.9", "10.9", "-", "-", "-"],
  ["I7092-080-PL", "ISO 7092", "Washer", "M8", 0, "Flat", "-", "Plastic", "-", "-", "-", "Plastic washer"],
  ["I7089-030-A2", "ISO 7089", "Washer", "M3", 0, "Flat", "-", "Stainless Steel A2", "A2", "-", "-", "Washer"],
  ["I7089-040-A2", "ISO 7089", "Washer", "M4", 0, "Flat", "-", "Stainless Steel A2", "A2", "-", "-", "Washer"],
  ["I7089-050-A2", "ISO 7089", "Washer", "M5", 0, "Flat", "-", "Stainless Steel A2", "A2", "-", "-", "Washer"],
  ["I7089-060-A2", "ISO 7089", "Washer", "M6", 0, "Flat", "-", "Stainless Steel A2", "A2", "-", "-", "Washer"],
  ["D7980-030-A2", "DIN 7980", "Spring washer", "M3", 0, "-", "-", "Stainless Steel A2", "A2", "-", "-", "Spring washer"],
  ["D7980-040-A2", "DIN 7980", "Spring washer", "M4", 0, "-", "-", "Stainless Steel A2", "A2", "-", "-", "Spring washer"],
  ["D7980-050-A2", "DIN 7980", "Spring washer", "M5", 0, "-", "-", "Stainless Steel A2", "A2", "-", "-", "Spring washer"],
  ["D7980-060-A2", "DIN 7980", "Spring washer", "M6", 0, "-", "-", "Stainless Steel A2", "A2", "-", "-", "Spring washer"],
  ["D7603A-05009010-CU", "DIN 7603A", "Sealing washer", "D5", 1, "-", "-", "Copper", "-", "-", "-", "d9 H1 copper sealing washer"],
  ["D7603A-10016015-CU", "DIN 7603A", "Sealing washer", "D10", 1.5, "-", "-", "Copper", "-", "-", "-", "d16 H1.5 copper sealing washer"],
  ["D7603A-20026015-CU", "DIN 7603A", "Sealing washer", "D20", 1.5, "-", "-", "Copper", "-", "-", "-", "d26 H1.5 copper sealing washer"],
  ["STD-WA-0007", "-", "Washer", "OD13.5 ID5.1", 1, "-", "-", "-", "-", "-", "-", "Washer OD13.5 ID5.1 H1"],
  ["STD-NU-0001", "-", "Nut", "M10x1.5", 0, "Hex", "-", "-", "-", "-", "-", "hex SW13"],
  ["I4035-060100-08", "ISO 4035", "Nut", "M6x1", 0, "Hex", "-", "-", "8", "-", "-", "Property class: 8"],
  ["I4035-080125-08", "ISO 4035", "Nut", "M8x1.25", 0, "Hex", "-", "-", "8", "-", "-", "Property class: 8"],
  ["D6923-080125-10", "DIN 6923", "Flange nut", "M8x1.25", 0, "Flange", "-", "-", "10", "-", "-", "Property class: 10"],
  ["STD-NU-0006", "-", "Clip nut", "M6", 0, "-", "-", "-", "-", "-", "-", "panel thickness: 3 mm"],
  ["I15983-040010-AL", "ISO 15983", "Rivet", "D4", 10, "-", "-", "Aluminium", "-", "-", "-", "ISO 15983 rivet"],
  ["STD-RB-0009", "Bollhoff Sitec", "Rivet nut", "M5", 0, "-", "-", "-", "-", "-", "-", "Bollhoff Sitec rivet nut"],
  ["STD-RB-0002", "Bollhoff Sitec", "Rivet nut", "M6", 0, "-", "-", "-", "-", "-", "-", "Bollhoff Sitec rivet nut"],
  ["SMX1-F-RW-13", "-", "Rivet nut", "M6x1", 0, "-", "-", "-", "-", "-", "-", "Threaded rivet nut"],
];

export const FASTENERS_DATA: Fastener[] = rawData.map((row, index) => {
  // Determine category based on type or code
  let category = 'Screws';
  const type = row[2].toLowerCase();
  const code = row[0].toLowerCase();

  if (type.includes('bolt')) category = 'Bolts';
  else if (type.includes('washer')) category = 'Washers';
  else if (type.includes('nut') && !type.includes('rivet nut')) category = 'Nuts';
  else if (type.includes('rivet nut')) category = 'Rivet Nuts';
  else if (type.includes('rivet')) category = 'Rivets';
  else if (code.startsWith('blt')) category = 'Bolts';
  else if (code.startsWith('wsh')) category = 'Washers';
  else if (code.startsWith('nut')) category = 'Nuts';
  else if (code.startsWith('rvt')) category = 'Rivets';
  else if (code.startsWith('rnut')) category = 'Rivet Nuts';

  return {
    id: (index + 1).toString(),
    internal_code: row[0],
    standard: row[1],
    type: row[2],
    thread: row[3],
    length_mm: row[4],
    head_type: row[5],
    drive_type: row[6],
    material: row[7],
    strength_grade: row[8],
    coating: row[9],
    usage: row[10],
    notes: row[11],
    category: category
  };
});
