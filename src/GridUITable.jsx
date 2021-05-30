import { useEffect, useState } from "react";

const GridUITable = ({ size }) => {
  const r = size[0];
  const c = size[1];
  const [obj, setObj] = useState({});
  const [start, setState] = useState([0, 10]);
  const [currentShowObj, setCurrentShowObj] = useState({});
  //   useEffect(() => {
  //     const dup = { ...currentShowObj };
  //     dup.splice(start[0], start[1]);
  //     setCurrentShowObj(dup);
  //   }, [start]);
  /*
    {
        0: {
            arr: [[0,0], [0,1, [[0,2][0,3]],[0,1]]
        }
    }
  */
  useEffect(() => {
    let obj = {};
    for (let i = 0; i < r; i++) {
      let outsideKey = Math.floor(Math.random() * 100000000);
      let newArr = [];
      for (let j = 0; j < c; j++) {
        let keyVal = Math.floor(Math.random() * 100000000);
        newArr.push([keyVal, ""]);
      }
      obj[i] = {
        id: outsideKey,
        arr: newArr,
      };
    }
    setObj(obj);
  }, [0]);
  const doSum = (expArr, i, rowI, operateObj) => {
    let valSum = 0;
    expArr.forEach((exp) => {
      let [row, column] = exp.split("-");
      if (!isNaN(row) && !isNaN(column)) {
        let val = operateObj[row]["arr"][column][1];
        if (operateObj[row]["arr"][column][2]) {
          operateObj[row]["arr"][column][2].push([i, rowI]);
        } else {
          operateObj[row]["arr"][column][2] = [[i, rowI]];
        }
        valSum += parseInt(val);
      } else {
        return false;
      }
    });
    return valSum;
  };
  const handleChange = (e, i, rowI) => {
    let changeObj = { ...obj };
    //The forumla format - SUM 1-1 10-1 10-2  done-> SUM row-column row-column
    let val = e.target.value;
    let resVal = val.split(" ");
    if (resVal[0] == "SUM" && resVal[resVal.length - 1] == "done") {
      let calcSum = doSum(resVal.slice(1), i, rowI, changeObj);
      if (calcSum == false) {
        changeObj[rowI]["arr"][i][3] = resVal.slice(1);
        changeObj[rowI]["arr"][i][1] = 0;
      } else {
        changeObj[rowI]["arr"][i][3] = resVal.slice(1);
        changeObj[rowI]["arr"][i][1] = calcSum;
      }
      setObj(changeObj);
    } else {
      changeObj[rowI]["arr"][i][1] = e.target.value;
      if (
        changeObj[rowI]["arr"][i][2] &&
        changeObj[rowI]["arr"][i][2].length > 0
      ) {
        changeObj[rowI]["arr"][i][2].forEach((val) => {
          changeObj = updatePartCell(val[0], val[1], changeObj);
        });
      }
      setObj(changeObj);
    }
    console.log(obj);
  };

  const updatePartCell = (i, rowI, changeObj) => {
    let calcSum = doSum(changeObj[rowI]["arr"][i][3], i, rowI, changeObj);
    if (calcSum == false) {
      changeObj[rowI]["arr"][i][1] = 0;
    }
    changeObj[rowI]["arr"][i][1] = calcSum;

    return changeObj;
  };
  const handleScroll = (e) => {};
  return (
    <>
      {Object.keys(obj).map((rowK, rowI) => (
        <div
          key={obj[rowK].id}
          style={{ display: "flex", flexDirection: "row" }}
        >
          {obj[rowK].arr.map((c, i) => {
            return (
              <div style={{ display: "flex", flexDirection: "column" }}>
                <input
                  onChange={(e) => handleChange(e, i, rowI)}
                  value={c[1]}
                />
              </div>
            );
          })}
        </div>
      ))}
      {/* {currentShowObj.map((rowK, rowI) => (
        <div
          key={obj[rowK].id}
          style={{ display: "flex", flexDirection: "row" }}
          onScroll={(e) => handleScroll(e)}
        >
          {obj[rowK].arr.map((c, i) => {
            return (
              <div style={{ display: "flex", flexDirection: "column" }}>
                <input
                  onChange={(e) => handleChange(e, i, rowI)}
                  value={c[1]}
                />
              </div>
            );
          })}
        </div>
      ))} */}
    </>
  );
};

export default GridUITable;
