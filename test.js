/*!
 * copyright-regex <https://github.com/regexps/copyright-regex>
 *
 * Copyright (c) 2015 Jon Schlinkert.
 * Licensed under the MIT license.
 */

'use strict';

var assert = require('assert');
var re = require('./')();

function match(str) {
  return str.match(re);
}

describe('match groups:', function () {
  it('should match the parts in a copyright statement:', function () {
    var matches = match('abc\nCopyright (c) 2013, Jon Schlinkert.\nxyz');
    assert.equal(matches[0], 'Copyright (c) 2013, Jon Schlinkert');
    assert.equal(matches[1], 'Copyright');
    assert.equal(matches[2], '(c)');
    assert.equal(matches[3], '2013, ');
    assert.equal(matches[4], '2013');
    assert.equal(matches[5], 'Jon Schlinkert');
  });

  it('should match a copyright statement with multiple dates:', function () {
    var matches = match('abc\nCopyright (c) 2013-2015, 2016, Jon Schlinkert.\nxyz');
    assert.equal(matches[0], 'Copyright (c) 2013-2015, 2016, Jon Schlinkert');
    assert.equal(matches[1], 'Copyright');
    assert.equal(matches[2], '(c)');
    assert.equal(matches[3], '2013-2015, 2016, ');
    assert.equal(matches[4], '2016');
    assert.equal(matches[5], 'Jon Schlinkert');
  });

  // a bunch of random copyright statements from using this regex for parsing
  it('should match valid statements:', function () {
    assert.equal(re.test('(C) Copyright 2000, 2001, 2002'), true);
    assert.equal(re.test('"Copyright 2011 craigslist, inc."'), true);
    assert.equal(re.test('#     Copyright (C) 1986-1993, 1998, 2004, 2007-2010'), true);
    assert.equal(re.test('# Copyright (C) 2013 Yusuke Suzuki <utatane.tea@gmail.com>'), true);
    assert.equal(re.test('###Copyright (C) 2011 by Charlie McConnell'), true);
    assert.equal(re.test('.\" Copyright (c) 2011, Joyent, Inc.  All Rights Reserved.'), true);
    assert.equal(re.test('.\" Copyright (c) 2011, Robert Mustacchi.  All Rights Reserved.'), true);
    assert.equal(re.test('/* Copyright (C) 1999 Masanao Izumo <iz@onicos.co.jp>'), true);
    assert.equal(re.test('//     Copyright (c) 2010-2012 Robert Kieffer'), true);
    assert.equal(re.test('//     Copyright (c) 2011-2013 John Roepke'), true);
    assert.equal(re.test('// Copyright (c) 2009-2013, Jeff Mott. All rights reserved.'), true);
    assert.equal(re.test('// Copyright (c) 2010 Ryan McGrath'), true);
    assert.equal(re.test('// Copyright (c) 2012 Artur Adib'), true);
    assert.equal(re.test('// Copyright (c) 2012, Mark Cavage. All rights reserved.'), true);
    assert.equal(re.test('// Copyright 2010-2012 Mikeal Rogers'), true);
    assert.equal(re.test('// Copyright 2011 Joyent, Inc.  All rights reserved.'), true);
    assert.equal(re.test('// Copyright 2011 Mark Cavage <mcavage@gmail.com> All rights reserved.'), true);
    assert.equal(re.test('// Copyright 2012 Joyent, Inc.  All rights reserved.'), true);
    assert.equal(re.test('// Portions created by the Initial Developer are Copyright (C) 2007'), true);
    assert.equal(re.test('//=> "Copyright (c) 2014 Jon Schlinkert"'), true);
    assert.equal(re.test('//=> Copyright (c) 2012-2014 Jon Schlinkert'), true);
    assert.equal(re.test('//=> Copyright (c) 2012-2014 Jon Schlinkert.'), true);
    assert.equal(re.test('//=> Copyright (c) 2014 Jon Schlinkert'), true);
    assert.equal(re.test('//=> Copyright (c) 2014 Jon Schlinkert'), true);
    assert.equal(re.test('//=> Copyright (c) 2014 Jon Schlinkert.'), true);
    assert.equal(re.test('//=> Copyright (c) 2014 [Jon Schlinkert](https://github.com/jonschlinkert)'), true);
    assert.equal(re.test('//Copyright Plato http://stackoverflow.com/a/19385911/995876'), true);
    assert.equal(re.test('<a href="http://www.w3.org/Consortium/Legal/copyright-documents-19990405">document'), true);
    assert.equal(re.test('<dc:rights>Copyright 2011 craigslist, inc.</dc:rights>'), true);
    assert.equal(re.test('<p class="copyright"><a href="http://www.w3.org/Consortium/Legal/ipr-notice-20000612#Copyright">Copyright</a>'), true);
    assert.equal(re.test('> Copyright &copy; 2011 Kevin Kwok'), true);
    assert.equal(re.test('> Copyright &copy; 2012 Eli Skeggs'), true);
    assert.equal(re.test('> Copyright &copy; 2013 C. Scott Ananian'), true);
    assert.equal(re.test('@copyright 2011-2013 John Roepke'), true);
    assert.equal(re.test('@license amdefine 0.1.0 Copyright (c) 2011, The Dojo Foundation All Rights Reserved.'), true);
    assert.equal(re.test('Adapted from bzip2.js, copyright 2011 Kevin Kwok (antimatter15@gmail.com).'), true);
    assert.equal(re.test('Adapted from bzip2.js, copyright 2011 antimatter15 (antimatter15@gmail.com).'), true);
    assert.equal(re.test('Adapted from node-bzip, copyright 2012 Eli Skeggs.'), true);
    assert.equal(re.test('Based on Underscore.js 1.5.2, copyright 2009-2013 Jeremy Ashkenas,'), true);
    assert.equal(re.test('Copyright   : Copyright c 2011 by Kimberly Geswein All rights reserved'), true);
    assert.equal(re.test('Copyright (C) 2004 Sam Hocevar <sam@hocevar.net>'), true);
    assert.equal(re.test('Copyright (C) 2011 Ariya Hidayat <ariya.hidayat@gmail.com>'), true);
    assert.equal(re.test('Copyright (C) 2011 Arpad Borsos <arpad.borsos@googlemail.com>'), true);
    assert.equal(re.test('Copyright (C) 2011 Kevin Kwok'), true);
    assert.equal(re.test('Copyright (C) 2011 Yusuke Suzuki <utatane.tea@gmail.com>'), true);
    assert.equal(re.test('Copyright (C) 2011 by Yehuda Katz'), true);
    assert.equal(re.test('Copyright (C) 2011-2012 Ariya Hidayat <ariya.hidayat@gmail.com>'), true);
    assert.equal(re.test('Copyright (C) 2012 Ariya Hidayat <ariya.hidayat@gmail.com>'), true);
    assert.equal(re.test('Copyright (C) 2012 Arpad Borsos <arpad.borsos@googlemail.com>'), true);
    assert.equal(re.test('Copyright (C) 2012 Eli Skeggs'), true);
    assert.equal(re.test('Copyright (C) 2012 John Freeman <jfreeman08@gmail.com>'), true);
    assert.equal(re.test('Copyright (C) 2012 Joost-Wim Boekesteijn <joost-wim@boekesteijn.nl>'), true);
    assert.equal(re.test('Copyright (C) 2012 Kris Kowal <kris.kowal@cixar.com>'), true);
    assert.equal(re.test('Copyright (C) 2012 Mathias Bynens <mathias@qiwi.be>'), true);
    assert.equal(re.test('Copyright (C) 2012 Robert Gust-Bardon <donate@robert.gust-bardon.org>'), true);
    assert.equal(re.test('Copyright (C) 2012 Yusuke Suzuki <utatane.tea@gmail.com>'), true);
    assert.equal(re.test('Copyright (C) 2012 [Yusuke Suzuki](http://github.com/Constellation)'), true);
    assert.equal(re.test('Copyright (C) 2012, 2011 [Ariya Hidayat](http://ariya.ofilabs.com/about)'), true);
    assert.equal(re.test('Copyright (C) 2012-2013 Mathias Bynens <mathias@qiwi.be>'), true);
    assert.equal(re.test('Copyright (C) 2012-2013 Michael Ficarra <escodegen.copyright@michael.ficarra.me>'), true);
    assert.equal(re.test('Copyright (C) 2012-2013 Yusuke Suzuki <utatane.tea@gmail.com>'), true);
    assert.equal(re.test('Copyright (C) 2012-2013 [Yusuke Suzuki](http://github.com/Constellation)'), true);
    assert.equal(re.test('Copyright (C) 2013 Ariya Hidayat <ariya.hidayat@gmail.com>'), true);
    assert.equal(re.test('Copyright (C) 2013 C. Scott Ananian'), true);
    assert.equal(re.test('Copyright (C) 2013 Irakli Gozalishvili <rfobic@gmail.com>'), true);
    assert.equal(re.test('Copyright (C) 2013 Mathias Bynens <mathias@qiwi.be>'), true);
    assert.equal(re.test('Copyright (C) 2013 Thaddee Tyl <thaddee.tyl@gmail.com>'), true);
    assert.equal(re.test('Copyright (C) 2013 Yusuke Suzuki <utatane.tea@gmail.com>'), true);
    assert.equal(re.test('Copyright (C) 2013 [Yusuke Suzuki](http://github.com/Constellation)'), true);
    assert.equal(re.test('Copyright (C) 2014 Yusuke Suzuki <utatane.tea@gmail.com>'), true);
    assert.equal(re.test('Copyright (c)  2010-2012 Robert Kieffer'), true);
    assert.equal(re.test('Copyright (c) 2008 Matsuza'), true);
    assert.equal(re.test('Copyright (c) 2009-2011, Kevin Decker kpdecker@gmail.com'), true);
    assert.equal(re.test('Copyright (c) 2009-2011, Mozilla Foundation and contributors'), true);
    assert.equal(re.test('Copyright (c) 2009-2014 TJ Holowaychuk <tj@vision-media.ca>'), true);
    assert.equal(re.test('Copyright (C) 2009-2015 Typesafe Inc. <http://www.typesafe.com>'), true);
    assert.equal(re.test('Copyright (c) 2010'), true);
    assert.equal(re.test('Copyright (c) 2010 Caolan McMahon'), true);
    assert.equal(re.test('Copyright (c) 2010 Christopher West'), true);
    assert.equal(re.test('Copyright (c) 2010-2012 Robert Kieffer'), true);
    assert.equal(re.test('Copyright (c) 2010-2013 Christian Johansen'), true);
    assert.equal(re.test('Copyright (c) 2010-2014 Christian Johansen'), true);
    assert.equal(re.test('Copyright (c) 2010-2014, Christian Johansen (christian@cjohansen.no) and'), true);
    assert.equal(re.test('Copyright (c) 2010-2014, Christian Johansen, christian@cjohansen.no'), true);
    assert.equal(re.test('Copyright (c) 2011 Christopher West'), true);
    assert.equal(re.test('Copyright (c) 2011 Dominic Tarr'), true);
    assert.equal(re.test('Copyright (c) 2011 Esa-Matti Suuronen esa-matti@suuronen.org'), true);
    assert.equal(re.test('Copyright (c) 2011 Joyent, Inc. and the persons identified as document authors.'), true);
    assert.equal(re.test('Copyright (c) 2011 Matthew Francis'), true);
    assert.equal(re.test('Copyright (c) 2011 Shan Carter'), true);
    assert.equal(re.test('Copyright (c) 2011 Sven Fuchs, Christian Johansen'), true);
    assert.equal(re.test('Copyright (c) 2011 TJ Holowaychuk &lt;tj@vision-media.ca&gt;'), true);
    assert.equal(re.test('Copyright (c) 2011 dreamerslab &lt;ben@dreamerslab.com&gt;'), true);
    assert.equal(re.test('Copyright (c) 2011 hij1nx <http://www.twitter.com/hij1nx>'), true);
    assert.equal(re.test('Copyright (c) 2011-2013 John Roepke'), true);
    assert.equal(re.test('Copyright (c) 2011-2013, Christopher Jeffrey (MIT License).'), true);
    assert.equal(re.test('Copyright (c) 2011-2013, Christopher Jeffrey. (MIT License)'), true);
    assert.equal(re.test('Copyright (c) 2011-2013, Christopher Jeffrey. (MIT Licensed)'), true);
    assert.equal(re.test('Copyright (c) 2011-2014 JP Richardson'), true);
    assert.equal(re.test('Copyright (c) 2012 Another-D-Mention Software and other contributors,'), true);
    assert.equal(re.test('Copyright (c) 2012 Barnesandnoble.com, llc, Donavon West, and Domenic Denicola'), true);
    assert.equal(re.test('Copyright (c) 2012 Mark Cavage'), true);
    assert.equal(re.test('Copyright (c) 2012 Matt Mueller &lt;mattmuelle@gmail.com&gt;'), true);
    assert.equal(re.test('Copyright (c) 2012 Maximilian Antoni'), true);
    assert.equal(re.test('Copyright (c) 2012 Simon Boudrias (twitter: @vaxilart)'), true);
    assert.equal(re.test('Copyright (c) 2012 Simon Boudrias (twitter: [@vaxilart](https://twitter.com/Vaxilart))'), true);
    assert.equal(re.test('Copyright (c) 2012 Tyler Kellen'), true);
    assert.equal(re.test('Copyright (c) 2012 Tyler Kellen. See LICENSE for further details.'), true);
    assert.equal(re.test('Copyright (c) 2012 [Vitaly Puzrin](https://github.com/puzrin).'), true);
    assert.equal(re.test('Copyright (c) 2012, 2013 moutjs team and contributors (http://moutjs.com)'), true);
    assert.equal(re.test('Copyright (c) 2012-2013 Jared Hanson <http://jaredhanson.net/>'), true);
    assert.equal(re.test('Copyright (c) 2012-2013, Eran Hammer <eran@hueniverse.com>'), true);
    assert.equal(re.test('Copyright (c) 2013 "Cowboy" Ben Alman'), true);
    assert.equal(re.test('Copyright (c) 2013 Assemble'), true);
    assert.equal(re.test('Copyright (c) 2013 Brian Woodward'), true);
    assert.equal(re.test('Copyright (c) 2013 C. Scott Ananian'), true);
    assert.equal(re.test('Copyright (c) 2013 Garen J. Torikian'), true);
    assert.equal(re.test('Copyright (c) 2013 Garen Torikian'), true);
    assert.equal(re.test('Copyright (c) 2013 Jared Hanson <[http://jaredhanson.net/](http://jaredhanson.net/)>'), true);
    assert.equal(re.test('Copyright (c) 2013 Jon Schlinkert, Brian Woodward, contributors'), true);
    assert.equal(re.test('Copyright (c) 2013 Jon Schlinkert, contributors.'), true);
    assert.equal(re.test('Copyright (c) 2013 Julian Gruber &lt;julian@juliangruber.com&gt;'), true);
    assert.equal(re.test('Copyright (c) 2013 Kyle Robinson Young'), true);
    assert.equal(re.test('Copyright (c) 2013 Matt Mueller <mattmuelle@gmail.com>'), true);
    assert.equal(re.test('Copyright (c) 2013 Maximilian Antoni'), true);
    assert.equal(re.test('Copyright (c) 2013 Segment.io &lt;friends@segment.io&gt;'), true);
    assert.equal(re.test('Copyright (c) 2013 Simon Boudrias'), true);
    assert.equal(re.test('Copyright (c) 2013 Simon Boudrias (twitter: @vaxilart)'), true);
    assert.equal(re.test('Copyright (c) 2013 Upstage.'), true);
    assert.equal(re.test('Copyright (c) 2013 Viacheslav Lotsmanov'), true);
    assert.equal(re.test('Copyright (c) 2013 [Richardson & Sons, LLC](http://richardsonandsons.com/)'), true);
    assert.equal(re.test('Copyright (c) 2013 [Richardson & Sons, LLC](http://richardsonandsons.com/)\r'), true);
    assert.equal(re.test('Copyright (c) 2013 \"Cowboy\" Ben Alman'), true);
    assert.equal(re.test('Copyright (c) 2013 hij1nx'), true);
    assert.equal(re.test('Copyright (c) 2013, Assemble, contributors'), true);
    assert.equal(re.test('Copyright (c) 2013, Deoxxa Development'), true);
    assert.equal(re.test('Copyright (c) 2013, Dominic Tarr'), true);
    assert.equal(re.test('Copyright (c) 2013, Jon Schlinkert, contributors'), true);
    assert.equal(re.test('Copyright (c) 2013, Jon Schlinkert.'), true);
    assert.equal(re.test('Copyright (c) 2014 "Cowboy" Ben Alman'), true);
    assert.equal(re.test('Copyright (c) 2014 Aron Nopanen'), true);
    assert.equal(re.test('Copyright (c) 2014 Assemble, contributors.'), true);
    assert.equal(re.test('Copyright (c) 2014 Brian Woodward'), true);
    assert.equal(re.test('Copyright (c) 2014 Brian Woodward, Jon Schlinkert, contributors.'), true);
    assert.equal(re.test('Copyright (c) 2014 Brian Woodward, contributors.'), true);
    assert.equal(re.test('Copyright (c) 2014 Charlike Mike Reagent (cli), contributors.'), true);
    assert.equal(re.test('Copyright (c) 2014 Fractal <contact@wearefractal.com>'), true);
    assert.equal(re.test('Copyright (c) 2014 Hugh Kennedy'), true);
    assert.equal(re.test('Copyright (c) 2014 Jon Schlinkert'), true);
    assert.equal(re.test('Copyright (c) 2014 Jon Schlinkert <https://github.com/jonschlinkert>'), true);
    assert.equal(re.test('Copyright (c) 2014 Jon Schlinkert, Brian Woodward'), true);
    assert.equal(re.test('Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors'), true);
    assert.equal(re.test('Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.'), true);
    assert.equal(re.test('Copyright (c) 2014 Jon Schlinkert, Brian Woodward.'), true);
    assert.equal(re.test('Copyright (c) 2014 Jon Schlinkert, contributors'), true);
    assert.equal(re.test('Copyright (c) 2014 Jon Schlinkert, contributors.'), true);
    assert.equal(re.test('Copyright (c) 2014 Julian Gruber &lt;julian@juliangruber.com&gt;'), true);
    assert.equal(re.test('Copyright (c) 2014 Matthew Mueller &lt;mattmuelle@gmail.com&gt;'), true);
    assert.equal(re.test('Copyright (c) 2014 Petka Antonov'), true);
    assert.equal(re.test('Copyright (c) 2014 Segment.io Inc. &lt;friends@segment.io&gt;'), true);
    assert.equal(re.test('Copyright (c) 2014 Sellside, Jon Schlinkert and Brian Woodward'), true);
    assert.equal(re.test('Copyright (c) 2014 Simon Boudrias (twitter: @vaxilart)'), true);
    assert.equal(re.test('Copyright (c) 2014 TJ Holowaychuk &lt;tj@vision-media.ca&gt;'), true);
    assert.equal(re.test('Copyright (c) 2014 [Jon Schlinkert](http://twitter.com/jonschlinkert), [Brian Woodward](http://twitter.com/doowb), contributors.'), true);
    assert.equal(re.test('Copyright (c) 2014 [Shinnosuke Watanabe](https://github.com/shinnn)'), true);
    assert.equal(re.test('Copyright (c) 2014 \"Cowboy\" Ben Alman'), true);
    assert.equal(re.test('Copyright (c) 2014 bl contributors'), true);
    assert.equal(re.test('Copyright (c) 2014, Jon Schlinkert, Brian Woodward'), true);
    assert.equal(re.test('Copyright (c) 2014, Jon Schlinkert, Brian Woodward, contributors.'), true);
    assert.equal(re.test('Copyright (c) 2014, Jon Schlinkert, contributors'), true);
    assert.equal(re.test('Copyright (c) 2014, Jon Schlinkert, contributors.'), true);
    assert.equal(re.test('Copyright (c) 2014-2015 Jon Schlinkert, contributors.'), true);
    assert.equal(re.test('Copyright (c) 2015 Jon Schlinkert, contributors.'), true);
    assert.equal(re.test('Copyright (c) Craig Spaeth <craigspaeth@gmail.com>, Art.sy, 2011-2013'), true);
    assert.equal(re.test('Copyright 2009-2011 Mozilla Foundation and contributors'), true);
    assert.equal(re.test('Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud Inc.'), true);
    assert.equal(re.test('Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors'), true);
    assert.equal(re.test('Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors'), true);
    assert.equal(re.test('Copyright 2010, 2011, Chris Winberry <chris@winberry.net>. All rights reserved.'), true);
    assert.equal(re.test('Copyright 2010, Chris Winberry <chris@winberry.net>. All rights reserved.'), true);
    assert.equal(re.test('Copyright 2010-2014 Caolan McMahon'), true);
    assert.equal(re.test('Copyright 2011 - Present AJ ONeal'), true);
    assert.equal(re.test('Copyright 2011 Mozilla Foundation and contributors'), true);
    assert.equal(re.test('Copyright 2011 The Closure Compiler Authors. All rights reserved.'), true);
    assert.equal(re.test('Copyright 2011 Twitter, Inc.'), true);
    assert.equal(re.test('Copyright 2011, John Resig'), true);
    assert.equal(re.test('Copyright 2011, The Dojo Foundation'), true);
    assert.equal(re.test('Copyright 2012 (c) Mihai Bazon <mihai.bazon@gmail.com>'), true);
    assert.equal(re.test('Copyright 2012 Michael Hart (michael.hart.au@gmail.com)'), true);
    assert.equal(re.test('Copyright 2012 Mozilla Foundation and contributors'), true);
    assert.equal(re.test('Copyright 2012- GoInstant, Inc. and other contributors. All rights reserved.'), true);
    assert.equal(re.test('Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>'), true);
    assert.equal(re.test('Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>'), true);
    assert.equal(re.test('Copyright 2012-2014, JP Richardson  <jprichardson@gmail.com>'), true);
    assert.equal(re.test('Copyright 2013 Assemble'), true);
    assert.equal(re.test('Copyright 2014 Mozilla Foundation and contributors'), true);
    assert.equal(re.test('Copyright Dustin Diaz 2011'), true);
    assert.equal(re.test('Copyright © 2011-2014 [Paul Vorbach](http://paul.vorba.ch/) and'), true);
    assert.equal(re.test('Copyright © 2013–2014 Domenic Denicola <domenic@domenicdenicola.com>'), true);
    assert.equal(re.test('Copyright(c) 2010 LearnBoost <dev@learnboost.com>'), true);
    assert.equal(re.test('Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca>'), true);
    assert.equal(re.test('Copyright(c) 2011 Ben Lin <ben@dreamerslab.com>'), true);
    assert.equal(re.test('Copyright(c) 2011 TJ Holowaychuk <tj@vision-media.ca>'), true);
    assert.equal(re.test('Copyright(c) 2012 Truepattern'), true);
    assert.equal(re.test('Copyright(c) 2014 Jonathan Ong'), true);
    assert.equal(re.test('Originally modified from scrawl.js. Copyright (c) 2014 [Caolan McMahon](https://github.com/caolan), contributors.'), true);
    assert.equal(re.test('Simple BufferStream is Copyright (c) 2012 Rod Vagg [@rvagg](https://twitter.com/rvagg) and licenced under the MIT licence. All rights not explicitly granted in the MIT license are reserved. See the included LICENSE file for more details.'), true);
    assert.equal(re.test('Simple BufferStream is Copyright (c) 2012 Rod Vagg [@rvagg](https://twitter.com/rvagg) and licenced under the MIT licence. All rights not explicitly granted in the MIT license are reserved. See the included LICENSE file for more details.",'), true);
    assert.equal(re.test('Sqwish is copyright Dustin Diaz 2011 under MIT License'), true);
    assert.equal(re.test('bl** is Copyright (c) 2013 Rod Vagg [@rvagg](https://twitter.com/rvagg) and licenced under the MIT licence. All rights not explicitly granted in the MIT license are reserved. See the included LICENSE.md file for more details.'), true);
    assert.equal(re.test('expectedHtml = "<p>Copyright &copy; 2003-2014</p>",'), true);
    assert.equal(re.test('expectedXml = "<p>Copyright &#xA9; 2003-2014</p>",'), true);
    assert.equal(re.test('isStream** is Copyright (c) 2014 Rod Vagg [@rvagg](https://twitter.com/rvagg) and licenced under the MIT licence. All rights not explicitly granted in the MIT license are reserved. See the included LICENSE file for more details.'), true);
    assert.equal(re.test('php.js is copyright 2011 Kevin van Zonneveld.'), true);
    assert.equal(re.test('through2** is Copyright (c) 2013 Rod Vagg [@rvagg](https://twitter.com/rvagg) and licenced under the MIT licence. All rights not explicitly granted in the MIT license are reserved. See the included LICENSE file for more details.'), true);
    assert.equal(re.test('to.js - copyright(c) 2012 openmason.'), true);
    assert.equal(re.test('use</a> and <a href="http://www.w3.org/Consortium/Legal/copyright-software-19980720">software'), true);
    assert.equal(re.test('var str = "<!doctype html><html><head><title>Some test</title></head><body><footer><p>Copyright &copy; 2003-2014</p></footer></body></html>",'), true);
  });

  it('should not match statements in unit tests:', function () {
    assert.equal(re.test('//   assert.equal(match("Copyright (c) 2013, Jon Schlinkert.")[0], "2013-2015");'), false);
    assert.equal(re.test('//   assert.equal(match("Copyright (c) 2013, Jon Schlinkert.")[0], "Copyright (c) 2013, Jon Schlinkert.");'), false);
    assert.equal(re.test('//   assert.equal(match("Copyright (c) 2013-2015, Jon Schlinkert.")[0], "2013-2015");'), false);
    assert.equal(re.test('//   assert.equal(match("Copyright (c) 2014, Jon Schlinkert.")[0], "2014-2015");'), false);
    assert.equal(re.test('//   assert.equal(match("Copyright (c) 2015, Jon Schlinkert.")[0], "2015");'), false);
    assert.equal(re.test('copyrightHelper(locals).should.eql("Copyright (c) 2014 Jon Schlinkert  ");'), false);
    assert.equal(re.test('copyrightHelper(locals).should.eql("Copyright (c) 2014 [Jon Schlinkert](https://github.com/jonschlinkert)  ");'), false);
  });

  it('should not match statements in templates:', function () {
    assert.equal(re.test('Copyright {%= year %} {%= author_name %}'), false);
    assert.equal(re.test('Copyright 2001-2002 ${name}<br>'), false);
    assert.equal(re.test('_.template("<%= _.copyright({author: author}) %>", locals).should.eql("Copyright (c) 2014 Jon Schlinkert  ");'), false);
    assert.equal(re.test('_.template("<%= copyright({author: author, linkify: false}) %>", locals, {imports: {copyright: copyrightHelper}}).should.eql("Copyright (c) 2014 [Jon Schlinkert](https://github.com/jonschlinkert)  ");'), false);
    assert.equal(re.test('_.template("<%= copyright({author: author}) %>", locals, {imports: {copyright: copyrightHelper}}).should.eql("Copyright (c) 2014 Jon Schlinkert  ");'), false);
    assert.equal(re.test('handlebars.compile("{{copyright this}}")(locals).should.eql("Copyright (c) 2014 Jon Schlinkert  ");'), false);
    assert.equal(re.test('handlebars.compile("{{copyright this}}")(locals).should.eql("Copyright (c) 2014 [Jon Schlinkert](https://github.com/jonschlinkert)  ");'), false);
    assert.equal(re.test('verb.partial("banner", { content: "/*! Copyright (c) 2014 Jon Schlinkert, Brian Woodward... */" });'), false);
    assert.equal(re.test('year("Copyright (c) 2012 Jon Schlinkert", {from: 2012})'), false);
    assert.equal(re.test('{%= copyright({year: 2012, linkify: true}) %}'), false);
    assert.equal(re.test('{%= copyright({year: 2012}) %}'), false);
  });
});

