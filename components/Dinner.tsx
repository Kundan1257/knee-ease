import React from "react";

const dinners = [
{
title: "Black Rice + Milk + Dry Fruits",
text: "Boiled black rice served warm with milk and small amounts of almonds, raisins or dates."
},
{
title: "Brown Rice + Purple Cabbage + Yellow Capsicum",
text: "Boiled brown rice mixed with lightly boiled cabbage and capsicum."
},
{
title: "Millet + Oat Milk + Milk",
text: "Soft boiled millet served with oat milk and a little regular milk."
},
{
title: "Sweet Potato + Spinach + Lentils",
text: "Boiled sweet potato with lightly boiled spinach and lentil soup."
},
{
title: "Vegetable Soup + Beans + Brown Rice",
text: "Light vegetable soup with boiled beans and a small portion of brown rice."
},
{
title: "Boiled Oats + Milk + Nuts",
text: "Soft boiled oats with warm milk and crushed almonds or walnuts."
},
{
title: "Quinoa + Carrot + Peas",
text: "Boiled quinoa mixed with carrots and peas."
},
{
title: "Boiled Potato + Green Beans + Yogurt",
text: "Boiled potatoes and green beans served with plain yogurt."
},
{
title: "Lentil Soup + Broccoli + Rice",
text: "Light lentil soup with steamed broccoli and a small portion of rice."
},
{
title: "Barley + Mixed Vegetables",
text: "Boiled barley mixed with cabbage, carrots and spinach."
}
];

const Dinner: React.FC = () => {
return (
<div style={{ padding: "20px" }}>
<h2 style={{ fontSize: "22px", marginBottom: "20px" }}>
Healthy Dinner Ideas
</h2>

{dinners.map((item, index) => (
<div
key={index}
style={{
background: "white",
borderRadius: "12px",
padding: "15px",
marginBottom: "16px",
boxShadow: "0 4px 10px rgba(0,0,0,0.08)"
}}
>
<h3 style={{ marginBottom: "8px" }}>
🍲 {item.title}
</h3>

<p style={{ color: "#444" }}>
{item.text}
</p>
</div>
))}

</div>
);
};

export default Dinner;