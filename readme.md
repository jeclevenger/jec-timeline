
<h1>jec-timeline</h1>
            <p>a tool for exploring timeline data structures</p>
            <p>currently hosted on <a href="http://www.jeclevenger.com/static-sites/jec-timeline/">JEClevenger.com/static-sites/jec-timeline</a></p>
            <h2 class="guiheader">Workflow</h2>
            <p>Visualize your own data in minutes. All you need to do is put it in the correct format.</p>
            <p>The JSON outline</p>
            <pre><code>
                {
                  "meta": {
                    "data_set_title": "",
                    "data_set_description": "",
                    "nav":[]
                  },
                  "data": []
                }
            </code></pre>
            <p>The data set contains nav information to display in the GUI. Each record contains display meta data, e.g. fill color.</p>
            <pre><code>
                {
                  "meta": {
                    "data_set_title": "Example data set reference in index.html",
                    "data_set_description": "This is a description of the data set, some meta data. Maybe explaining
                        how it was created, why, etc.",
                    "nav":[
                      {
                        "label": "the first display option",
                        "sets": [2]
                      },
                      {
                        "label": "the second display option",
                        "sets": [1,3]
                      }
                    ]
                  },
                  "data": [
                    {
                        "id": 0,
                        "title": "Example Event",
                        "start": "01 June 2000",
                        "end": "15 August 2003",
                        "set": 1,
                        "description": "First event in this example",
                        "color": "#d4b9da"
                    },
                    {
                        "id": 1,
                        "title": "2nd example vent",
                        "start": "01 July 1998",
                        "end": "01 August 2001",
                        "set": 2,
                        "description": "the 2nd event in this example",
                        "color": "#d4b9da"
                    }
                  ]
                }
            </code></pre>
            <p>You can download the repo and visualize locally or submit a data set to the repo via GitHub pull request.</p>
            <p>Scroll down to see examples.</p>
            <h2 class="guiheader">Currently built with</h2>
            <ul>
                <li>HTML, CSS, JavaScript</li>
                <li>
                    <a href="https://d3js.org/">D3.js</a>
                </li>
                <li>
                    <a href="http://getbootstrap.com/">Bootstrap</a>
                </li>
                <li>
                    <a href="https://jquery.com/">jQuery</a>
                </li>
                <li>
                    <a href="http://www.json.org/">JSON</a>
                </li>
            </ul>
            <h2 class="guiheader">Inspired by</h2>
            <ul>
                <li>
                    <a href="https://github.com/jiahuang/d3-timeline">https://github.com/jiahuang/d3-timeline</a>
                </li>
                <li>
                    <a href="http://codepen.io/chris-creditdesign/pen/yuFjr">http://codepen.io/chris-creditdesign/pen/yuFjr</a>
                </li>
                <li>
                    <a href="http://colorbrewer2.org/">http://colorbrewer2.org/</a>
                </li>
            </ul>
            <h2 class="guiheader">To-do</h2>
            <p>To-do page coming soon, they are sprinkled throughout the code. Some are prefaced by a 'todo' tag.</p>
            <h2 class="guiheader">Development timelines</h2>
            <ul>
                <li>
                    <a href="datnewnew.html">datnewnew</a>
                </li>
                <li>
                    <a href="jeclevenger.html">jeclevenger.com current</a>
                </li>
                <li>
                    <a href="jeclevenger-old.html">jeclevenger.com old</a>
                </li>
                <li>
                    <a href="original.html">original</a>
                </li>
                <li>
                    <a href="plannedworkflow.html">planned workflow</a>
                </li>
            </ul>