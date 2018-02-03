
const quote = document.querySelector('#quote');
const quotee = document.querySelector('#quotee');
const bgQuotee = document.querySelector('#bg-quotee');
const newQuoteBtn = document.querySelector('#new');
const tweetBtn = document.querySelector('#tweet');

function randomQuote() {
	const x = Math.floor(Math.random()*(quotes.length));

	// change text content on the site
	quote.textContent = `${quotes[x].quote}`;
	quotee.textContent = `${quotes[x].quotee}`;
	bgQuotee.textContent = `${quotes[x].quotee}`;

	// implement tweet link to button
	const tweetText = encodeURIComponent(`"${quotes[x].quote}" - ${quotes[x].quotee}`);
	tweetBtn.href = "https://twitter.com/intent/tweet?text=" + tweetText;

	// change background-color
	const h = Math.floor(Math.random()*361);
	document.body.style.background = `hsla(${h}, 41%, 82%, 1)`;
	document.querySelector('#buttons').style.color = `hsla(${h}, 41%, 82%, 1)`;
}

window.addEventListener('load', randomQuote);
newQuoteBtn.addEventListener('click', randomQuote);

// open new window for tweet (snippet from twitter)
window.twttr = (function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0],
    t = window.twttr || {};
  if (d.getElementById(id)) return t;
  js = d.createElement(s);
  js.id = id;
  js.src = "https://platform.twitter.com/widgets.js";
  fjs.parentNode.insertBefore(js, fjs);
  t._e = [];
  t.ready = function(f) {
    t._e.push(f);
  };
  return t;
}(document, "script", "twitter-wjs"));

const quotes = [
{quote: "Just keep taking chances and having fun.", quotee: "Garth Brooks"},
{quote: "Time moves in one direction, memory in another.", quotee: "William Gibson"},
{quote: "Yesterday's the past, tomorrow's the future, but today is a gift. That's why it's called the present.", quotee: "Bil Keane"},
{quote: "Miracles happen everyday, change your perception of what a miracle is and you'll see them all around you.", quotee: "Jon Bon Jovi"},
{quote: "You must be the change you wish to see in the world.", quotee: "Mahatma Gandhi"},
{quote: "Lose an hour in the morning, and you will spend all day looking for it.", quotee: "Richard Whately"},
{quote: "To improve is to change; to be perfect is to change often.", quotee: "Winston Churchill"},
{quote: "Kindness is always fashionable, and always welcome.", quotee: "Amelia Barr"},
{quote: "Sometimes your joy is the source of your smile, but sometimes your smile can be the source of your joy.", quotee: "Thich Nhat Hanh"},
{quote: "A warm smile is the universal language of kindness.", quotee: "William Arthur Ward"},
{quote: "It is better to travel well than to arrive.", quotee: "Buddha"},
{quote: "You cannot explore the universe if you think that you are the center of it.", quotee: "Joshua Suya Pelicano"},
{quote: "Wherever you go, go with all your heart.", quotee: "Confucius"},
{quote: "Look deep into nature, and then you will understand everything better.", quotee: "Albert Einstein"},
{quote: "On earth there is no heaven, but there are pieces of it." , quotee: "Jules Renard"},
{quote: "Life isn't about finding yourself. Life is about creating yourself." , quotee: "George Bernard Shaw"},
{quote: "If you carry joy in your heart, you can heal any moment.", quotee: "Carlos Santana"},
{quote: "Be happy for this moment. This moment is your life.", quotee: "Omar Khayyam"},
{quote: "If you are too buys to laugh, you are too busy.", quotee: "Proverb"},
{quote: "No act of kindness, no matter how small, is ever wasted.", quotee: "Aesop"},
{quote: "Action may not always bring happiness; but there is no happiness without action.", quotee: "Benjamin Disraeli"},
{quote: "It's a helluva start, being able to recognize what makes you happy.", quotee: "Lucille Ball"},
{quote: "Childhood means simplicity. Look at the world with the child's eye - it is very beautiful.", quotee: "Kailash Satyarthi"},
{quote: "You can't cross the sea merely by standing and staring at the water.", quotee: "Rabindranath Tagore"},
{quote: "Life is 10% what happens to you and 90% how you react to it.", quotee: "Charles R. Swindoll"},
{quote: "Aim for the moon. If you miss, you may hit a star.", quotee: "W. Clement Stone"},
{quote: "Good, better, best. Never let it rest. 'Til your good is better and your better is best.", quotee: "St. Jerome"},
{quote: "Do something wonderful, people may imitate it.", quotee: "Albert Schweitzer"},
{quote: "Keep your eyes on the stars, and your feet on the ground.", quotee: "Theodore Roosevelt"},
{quote: "What you get by achieving your goals is not as important as what you become by achieving your goals.", quotee: "Zig Ziglar"},
{quote: "We may encounter many defeats but we must not be defeated.", quotee: "Maya Angelou"},
{quote: "It always seems impossible until its done.", quotee: "Nelson Mandela"},
{quote: "Either you run the day or the day runs you.", quotee: "Jim Rohn"},
{quote: "Your talent is God's gift to you. What you do with it is your gift back to God.", quotee: "Leo Buscaglia"},
{quote: "If you can dream it, you can do it.", quotee: "Walt Disney"},
{quote: "Even if you fall on your face, you're still moving forward.", quotee: "Victor Kiam"},
{quote: "What you get by achieving your goals is not as important as what you become by achieving your goals.", quotee: "Zig Ziglar"},
{quote: "Opportunity does not knock, it presents itself when you beat down the door.", quotee: "Kyle Chandler"},
{quote: "Rise above the storm and you will find the sunshine.", quotee: "Mario Fernandez"},
{quote: "If opportunity doesn't knock, build a door." , quotee: "Milton Berle"},
{quote: "I want to be like a sunflower; so that even on the darkest days I will stand tall and find the sunlight.", quotee: "M.K."},
{quote: "Success is a journey not a destination.", quotee: "Ben Sweetland"},
{quote: "Friends are the sunshine of life.", quotee: "John Hay"},
{quote: "Every accomplishment starts with the decision to try.", quotee: "Brian Littrell"},
{quote: "Love yourself first and everything else falls into place.", quotee: "Lucille Ball"},
{quote: "In three words I can sum up everything I've learned about life: It goes on.", quotee: "Robert Frost"},
{quote: "If you have good thoughts, they will shine out of your face like sunbeams and you will always look lovely.", quotee: "Roald Dahl"},
{quote: "Encourage yourself, believe in yourself, and love yourself. Never doubt who you are.", quotee: "Stephanie Lahart"},
{quote: "To live is the rarest thing in the world. Most people just exist.", quotee: "Oscar Wilde"},
{quote: "It takes a strong person to do their own thing and not wait for anybody else to validate their existence.", quotee: "Steven Aitchison"},
{quote: "Tension is who you think you should be. Relaxation is who you are.", quotee: "Chinese Proverb"},
{quote: "Be yourself because an original is always worth more than a copy.", quotee: "Suzy Kassem"},
{quote: "My religion is very simple. My religion is kindness.", quotee: "Dalai Lama"},
{quote: "People are prettiest when they talk about something they really love with passion in their eyes.", quotee: "KVH"},
{quote: "Don't let anyone speak for you, and don't rely on others to fight for you.", quotee: "Michelle Obama"},
{quote: "Those who bring sunshine into the lives of others cannot keep it from themselves.", quotee: "J.M. Barrie"},
{quote: "I am overly ambitious because I realize it can be done.", quotee: "Pharrell Williams"},
{quote: "Why are you trying so hard to fit in when you were born to stand out?", quotee: "Ian Wallace"},
{quote: "Be there for others, but never leave yourself behind.", quotee: "Dodinsky"},
{quote: "A beautiful face will age and a perfect body will change, but a beautiful soul will always be a beautiful soul.", quotee: "Unkown"},
{quote: "You are never too old to set another goal or to dream a new dream.", quotee: "C.S. Lewis"},
{quote: "Never regret anything that made you smile.", quotee: "Mark Twain"},
{quote: "A person who never made a mistake never tried anything new.", quotee: "Albert Einstein"},
{quote: "With the new day comes new strength and new thoughts.", quotee: "Eleanor Roosevelt"},
{quote: "Doubt kills more dreams than failure ever will.", quotee: "Suzy Kassem"},
{quote: "You don't always need a plan. Sometimes you just need to breathe, trust, let go, and see what happens.", quotee: "Mandy Hale"},
{quote: "If you cannot do great things, do small things in a great way.", quotee: "Napoleon Hill"},
{quote: "Colaborate with people you can learn from.", quotee: "Pharrell Williams"},
{quote: "Every day may not be good, but there's something good in every day.", quotee: "Alice Morse Earle"},
{quote: "We are all broken, that's how the light gets in.", quotee: "Ernest Hemingway"},
{quote: "We do not remember days, we remember moments.", quotee: "Cesare Pavese"},
{quote: "A friend is like a four leaf clover, hard to find and lucky to have.", quotee: "Irish Proverb"},
{quote: "By being yourself you put something wonderful in the world that was not there before.", quotee: "Edwin Elliot"},
{quote: "Be quiet so that life may speak.", quotee: "Leo Babauta"},
{quote: "The most waster of all days is one without laughter.", quotee: "Nicholas Chamfort"},
{quote: "Never let success get to your head. Never let failure get to your heart.", quotee: "Beyonce Knowles"},
{quote: "You can't start the next chapter of your life if you keep re-reading the last one.", quotee: "Unknown"},
{quote: "Be somebody who makes everybody feel like a somebody.", quotee: "Unknown"},
{quote: "Sometimes you will never know the value of a moment until it becomes a memory.", quotee: "Dr. Seuss"},
{quote: "Make today so awesome that yesterday gets jealous.", quotee: "Unknown"},
{quote: "A kind word is like a spring day.", quotee: "Russian Proverb"},
{quote: "The first step is you have to say that you can.", quotee: "Will Smith"},
{quote: "Life is getting up an hour early to live an hour more.", quotee: "Unknown"},
{quote: "Snowflakes are kisses from heaven.", quotee: "Unknown"},
{quote: "We can't help everyone, but everyone can help someone.", quotee: "Ronald Reagan"},
{quote: "Despite the forecast, live like it's spring.", quotee: "Lily Pulitzer"},
{quote: "I've failed over and over again in my life. And that is why I succeed." , quotee: "Michael Jordan"},
{quote: "You are more powerful than you know; You are beautiful just as you are.", quotee: "Melissa Etheridge"},
{quote: "Life moves pretty fast. If you don't stop and look around once in a while, you could miss it.", quotee: "Ferris Beuller's Day Off"},
{quote: "If you're feeling low, don't despair. The sun has a sinking spell every night, but it comes back up every morning.", quotee: "Dolly Parton"},
{quote: "No winter lasts forever; no spring skips its turn.", quotee: "Hal Borland"},
{quote: "Failure is an important part of your growth and developing resilience. Don't be afraid to fail.", quotee: "Michelle Obama"},
{quote: "Try to be a rainbow in someone's cloud.", quotee: "Maya Angelou"},
{quote: "If you obey all the rules, you miss all the fun.", quotee: "Katharine Hepburn"},
{quote: "Happiness can be found, even in the darkest of times, if one only remembers to turn on the light.", quotee: "J.K Rowling"},
{quote: "The best and most beautiful things in the world cannot be seen or even touched - they must be felt with the heart.", quotee: "Helen Keller"},
{quote: "Nothing is impossible. The world itself says , 'I'm possible!'", quotee: "Audrey Hepburn"},
{quote: "I have found the paradox that if you love until it hurts, there can be no more hurt, only more love.", quotee: "Mother Teresa"},
{quote: "Love doesn't make the world go 'round. Love is what makes the ride worthwhile.", quotee: "Franklin P. Jenner"},
{quote: "Believe you can and you're halfway there.", quotee: "Theodore Roosevelt"},
{quote: "A friend is one who knows you and loves you just the same.", quotee: "Elbert Hubbard"},
{quote: "A real friend is one who walks in when the rest of the world walks out.", quotee: "Walter Winchell"},
{quote: "Friends are the siblings God never gave us.", quotee: "Mencius"},
{quote: "Things are never quite as scary when you've got a best friend.", quotee: "Bill Waterson"},
{quote: "The best and most beautiful things in the world cannot be seen or even touched - they must be felt with the heart.", quotee: "Helen Keller"},
{quote: "Joy does not simply happen to us. We have to choose joy and keep choosing it every day.", quotee: "Henri J.M. Nouwen"},
{quote: "The moment you doubt whether you can fly, you cease forever to be able to do it.", quotee: "J.M. Barrie"},
{quote: "Be a first-rate version of yourself, instead of a second-rate version of somebody else.", quotee: "Judy Garland"},
{quote: "The only person you are destined to become is the person you decide to be.", quotee: "Ralph Waldo Emerson"},
{quote: "Doubt kills more dreams than failure ever will.", quotee: "Suzy Kassem"},
{quote: "You can't let your failures define you. You have to let your failures teach you.", quotee: "Barack Obama"},
{quote: "If you don't have failures, you're not trying hard enough.", quotee: "Richard Branson"},
{quote: "Failure is a bruise, not a tattoo", quotee: "Jon Sinclair"},
{quote: "Ever tried. Ever failed. No matter. Try Again. Fail again. Fail better.", quotee: "Samuel Beckett"},
{quote: "There is no such thing as failure. Failure is just life trying to move us in the right direction.", quotee: "Oprah Winfrey"},
{quote: "I can accept failure, everyone fails at something. But I can't accept not trying.", quotee: "Michael Jordan"},
{quote: "Success is the ability to go from one failure ti another qith no less of enthusiasm.", quotee: "Winston Churchill"},
{quote: "Our greates glory is not in never failing, but in rising up every time we fail.", quotee: "Ralph Waldo Emerson"},
{quote: "Think like a queen. A queen is not afraid to fail. Failure is another stepping stone to greatness.", quotee: "Oprah Winfrey"},
{quote: "Failure is a much more faithful teacher than immediate success.", quotee: "David Duchemin"},
{quote: "Success is sometimes the outcome of a whole string of failures.", quotee: "Salvador Dali"},
{quote: "The world will see you the way you see you, and treat you the way you treat yourself.", quotee: "Beyonce Knowles"},
{quote: "When they go low, we go high.", quotee: "Michelle Obama"},
{quote: "Creative people are often considered crazy, but I believe crazy can be a good thing.", quotee: "Pharrell Williams"}
];
