const path = require('path');

const TMP_DIR           = process.env.TMP_DIR ||  path.resolve(__dirname, '../tmp/');
const SOLUTION_OBJ_FILE = path.resolve(TMP_DIR, 'solutionObject.js');
const s                 = require(SOLUTION_OBJ_FILE).solutionObject;


test('adds two numbers', () => {
  
  // public
  expect(s['s.add(1,2,3)']).toBe(6);
  expect(s['s.add(1,1,1)']).toBe(3);
  expect(s['s.add(2,3,4)']).toBe(9);

  // private
  expect(s['s.add(5,5,5)']).toBe(15);

});
