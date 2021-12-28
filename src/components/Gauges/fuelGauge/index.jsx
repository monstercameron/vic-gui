import LiquidFillGauge from "react-liquid-gauge";

export default function Index({ value }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <LiquidFillGauge
                style={{ margin: "0" }}
                width={260}
                height={260}
                value={value || 0}
                percent="%"
                textSize={1}
                textOffsetX={0}
                textOffsetY={0}
                textRenderer={(props) => {
                    const value = Math.round(props.value);
                    const radius = Math.min(props.height / 2.75, props.width / 2);
                    const textPixels = (props.textSize * radius) / 2;
                    const valueStyle = {
                        fontSize: textPixels,
                    };
                    const percentStyle = {
                        fontSize: textPixels * 0.75,
                    };

                    return (
                        <tspan>
                            <tspan className="value" style={valueStyle}>
                                Fuel: {value}
                            </tspan>
                            <tspan style={percentStyle}>{props.percent}</tspan>
                        </tspan>
                    );
                }}
                riseAnimation
                waveAnimation
                waveFrequency={2}
                waveAmplitude={3}
                gradient
                circleStyle={{
                    fill: "#ffffff",
                }}
                waveStyle={{
                    fill: "#000000",
                }}
                textStyle={{
                    fill: "#000000",
                    fontFamily: "Arial",
                }}
                waveTextStyle={{
                    fill: "#ffffff",
                    fontFamily: "Arial",
                }}
                onClick={() => {
                    console.log("click!");
                }}
            />
        </div>
    )
}
