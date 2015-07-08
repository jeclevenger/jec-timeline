<h2>jec-timeline</h2>
<p>currently hosted on <a href="http://www.caslmedia.com/jec-timeline/">CaslMedia.com/jec-timeline</a></p>
<p>timeline orginally from <a href="http://www.jeclevenger.com">JEClevenger.com</a> broken into a separate open source project for exploring timeline data structures</p>
<hr>
<h4>inspired by these projects:</h4>
<ul>
<li>
https://github.com/jiahuang/d3-timeline
</li>
<li>
http://codepen.io/chris-creditdesign/pen/yuFjr
</li>
<li>
http://colorbrewer2.org/
</li>
</ul>

<h4>examples in code:</h4>
<ul>
<li>
jQuery data scrubbing based on user selection
</li>
<li>
D3 plotting based on user selection
</li>
<li>
json data format for timeline and jQuery nav
</li>
</ul>

<p>Had to decide on a data format that made sense for navigation given the data scrubbing methods for the original. Should be pretty easy to just swap data and start playing with your own timeline, which was the original point of this repo.</p>


<h4>v0.1.0 coming once standard data structures are chosen</h4>
<p>standard data structure <a href="data/time_bound.json">started</a> for time-bound data, <a href="http://www.jeclevenger.com/writing/TIME.html">discussion</a> will follow in documentation shortly.</p>
<ul>
<li>standard data format</li>
<li>nav</li>
<li>examples</li>
<li>text display with data scrubbing for recurring events, as half-done on <a href="http://www.jeclevenger.com">jeclevenger.com</a></li>
</ul>

<h4>todo</h4>
<ul>
<li>break apart data and plotting functions for nav, re-use d3 elements be more proper</li>
<li>more data</li>
<li>nav for selections</li>
<li>consolidate d3 plotting functions</li>
</ul>
