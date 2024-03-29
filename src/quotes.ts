export const quotes = [
  {author: 'Confucius', quote: 'It doesn’t matter how slowly you go so long as you do not stop…'},
  {author: 'Lucretius', quote: 'Constant dripping hollows out a stone…'},
  {author: 'Benjamin Disraeli', quote: 'Experience is the child of thought, and thought is the child of action…'},
  {author: 'Jim Rohn', quote: 'How long should you try? Until…'},
  {author: 'Seneca', quote: 'It’s not because things are difficult that we dare not venture. It’s because we dare not venture that they are difficult…'},
  {author: 'Norman Vincent Peale', quote: 'Stand up to your obstacles and do something about them. You will find that they haven’t half the strength you think they have…'},
  {author: 'Jim Rohn', quote: 'Motivation is what gets you started. Habit is what keeps you going…'},
  {author: 'Walter Bagehot', quote: 'The greatest pleasure in life is doing what people say you can’t do…'},
  {author: 'Virgil', quote: 'They can because they think they can…'},
  {author: 'Henry Ford', quote: 'Obstacles are those frightful things you see when you take your eyes off your goals…'},
  {author: 'Peter A. Cohen', quote: 'There is no one giant step that does it. It’s a lot of little steps…'},
  {author: 'Johann Wolfgang Von Goethe', quote: 'Knowing is not enough..We must apply. Willing is not enough..We must do…'},
  {author: 'Samuel Johnson', quote: 'Great works are performed not by strength but by perseverance…'},
  {author: 'Mahatma Gandhi', quote: 'Almost everything you do will seem insignificant, but it is important that you do it…'},
  {author: 'Albert Einstein', quote: 'I think and think for months and years. Ninety-nine times, the conclusion is false. The hundredth time I am right…'},
  {author: 'H. Jackson Browne', quote: 'Don’t be afraid to go out on a limb. That’s where the fruit is…'},
  {author: 'Theodore Roosevelt', quote: 'Believe you can and you are halfway there…'},
  {author: 'William Butler Yeats', quote: 'Do not wait to strike till the iron is hot; but make it hot by striking…'},
  {author: 'Benjamin Franklin', quote: 'Energy and persistence conquer all things…'},
  {author: 'Charles Auston Bates', quote: 'Lots of things that couldn’t be done have been done…'},
  {author: 'John F. Kennedy', quote: 'If not us, who?..If not now, when?…'},
  {author: 'Lou Holtz', quote: 'If what you did yesterday seems big, you haven’t done anything today…'},
  {author: 'Winston Churchill', quote: 'If you’re going through hell, keep going…'},
  {author: 'Robert Frost', quote: 'The best way out is always through…'},
  {author: 'Zig Ziglar', quote: 'People often say that motivation doesn’t last. Well, neither does bathing.. that’s why we recommend it daily…'},
  {author: 'Andre Gide', quote: 'Man cannot discover new oceans unless he has the courage to lose sight of the shore…'},
  {author: 'John Mason', quote: 'Don’t wait for your ship to come In.. swim out to meet it!…'},
  {author: 'Dale Carnegie', quote: 'Do the hard jobs first. The easy jobs will take care of themselves…'},
  {author: 'Mark Twain', quote: 'The secret of getting ahead is getting started…'},
  {author: 'Walt Disney', quote: 'It’s kind of fun to do the impossible…'},
]

export const randomQuote = (): {author: string, quote: string} => {
  return quotes[Math.floor(Math.random() * quotes.length)]
}

export const shortQuotes = [
  "You can totally do this",
  "Don’t tell people your plans. Show them your results.",
  "No pressure, no diamonds",
  "Stay foolish to stay sane.",
  "When nothing goes right, go left",
  "Try Again. Fail again. Fail better",
  "Impossible is for the unwilling",
  "I can and I will",
  "Prove them wrong",
  "And so the adventure begins",
];

export const randomShortQuote = (): string => {
  return shortQuotes[Math.floor(Math.random() * shortQuotes.length)]
}