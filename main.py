
from flask import Flask

import folium

from folium import IFrame

text = 'your text here'

iframe = folium.IFrame(text, width=350, height=200)
popup = folium.Popup(iframe, max_width=3000)




app = Flask(__name__)

@app.route('/')
def index():
    folium_map = folium.Map(location=[26.931975, -105.688865], zoom_start=12, tiles="OpenStreetMap")

    tooltip = "Click me!"

    folium.Marker(
        [26.931975, -105.688865], popup=popup, tooltip=tooltip
    ).add_to(folium_map)
    folium.Marker(
        [26.933228, -105.723736], popup="<b>Timberline Lodge</b>", tooltip=tooltip
    ).add_to(folium_map)

    


    return folium_map._repr_html_()


if __name__ == '__main__':
    app.run(debug=True)