import React, {useEffect, useState} from 'react'
import {VictoryArea, VictoryChart, VictoryLabel, VictoryPolarAxis, VictoryTheme} from "victory";
import "./App.css"

const characterData = [
    { strength: 1, intelligence: 250, luck: 1, stealth: 40, charisma: 50 },
    { strength: 2, intelligence: 300, luck: 2, stealth: 80, charisma: 90 },
    { strength: 5, intelligence: 225, luck: 3, stealth: 60, charisma: 120 }
];

const VictoryRadar = () => {
    const [data, setData] = useState([]);
    const [maxima, setMaxima] = useState({});

    useEffect(() => {
        const getMaxima = (data) => {
            const groupedData = Object.keys(data[0]).reduce((memo, key) => {
                memo[key] = data.map((d) => d[key]);
                return memo;
            }, {});
            return Object.keys(groupedData).reduce((memo, key) => {
                memo[key] = Math.max(...groupedData[key]);
                return memo;
            }, {});
        }

        const processData = (data) => {
            const maxByGroup = getMaxima(data);
            const makeDataArray = (d) => {
                return Object.keys(d).map((key) => {
                    return { x: key, y: d[key] / maxByGroup[key] };
                });
            };
            return data.map((datum) => makeDataArray(datum));
        }

        setData(processData(characterData));
        setMaxima(getMaxima(characterData));
    }, []);

    return (
        <div className={"wrapper-radar"}>
        <VictoryChart polar theme={VictoryTheme.material} domain={{ y: [0, 1] }}>
            <VictoryArea
                key={0}
                data={data}
                colorScale={["gold", "orange", "tomato"]}
                style={{ data: { fillOpacity: 0.2, strokeWidth: 2 } }}
            />
            {Object.keys(maxima).map((key, i) => {
                return (
                    <VictoryPolarAxis
                        key={i}
                        dependentAxis
                        style={{
                            axisLabel: { padding: 10 },
                            axis: { stroke: "none" },
                            grid: { stroke: "grey", strokeWidth: 0.25, opacity: 0.5 }
                        }}
                        tickLabelComponent={<VictoryLabel labelPlacement="vertical" />}
                        labelPlacement="perpendicular"
                        axisValue={i + 1}
                        label={key}
                        tickFormat={(t) => Math.ceil(t * maxima[key])}
                        tickValues={[0.25, 0.5, 0.75]}
                    />
                );
            })}
            <VictoryPolarAxis
                labelPlacement="parallel"
                tickFormat={() => ""}
                style={{ axis: { stroke: "none" }, grid: { stroke: "grey", opacity: 0.5 } }}
            />
        </VictoryChart>
        </div>
    );
}

export default VictoryRadar;