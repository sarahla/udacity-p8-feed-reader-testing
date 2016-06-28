/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

$(function() {

	describe('RSS Feeds', function() {

		/* This is our first test - it tests to make sure that the
		 * allFeeds variable has been defined and that it is not
		 * empty. Experiment with this before you get started on
		 * the rest of this project. What happens when you change
		 * allFeeds in app.js to be an empty array and refresh the
		 * page?
		 */
		it('are defined', function() {
			expect(allFeeds).toBeDefined();
			expect(allFeeds.length).not.toBe(0);
		});


		/* A test that loops through each feed
		 * in the allFeeds object and ensures it has a URL defined
		 * and that the URL is not empty.
		 */
		it('have urls that are defined and not empty', function() {
			allFeeds.forEach(function(feed){
				expect(feed.url).toBeDefined();
				expect(feed.url.length).not.toBe(0);
			});
		});


		/* A test that loops through each feed
		 * in the allFeeds object and ensures it has a name defined
		 * and that the name is not empty.
		 */
		it('have names that are defined and not empty', function() {
			allFeeds.forEach(function(feed){
				expect(feed.name).toBeDefined();
				expect(feed.name.length).not.toBe(0);
			});
		});
	});

	describe('The menu', function() {

		// define body
		var body = $('body');

		/* A test that ensures the menu element is
		 * hidden by default. You'll have to analyze the HTML and
		 * the CSS to determine how we're performing the
		 * hiding/showing of the menu element.
		 */
		it('is hidden by default', function() {
			// check that the class that hides the menu is applied to the body
			expect(body.hasClass('menu-hidden')).toBe(true);
		});

		/* A test that ensures the menu changes
		 * visibility when the menu icon is clicked. This test
		 * should have two expectations: does the menu display when
		 * clicked and does it hide when clicked again.
		 */
		it('toggles open/closed when clicked', function() {
			var menuLink = $('.menu-icon-link');

			// click the menu item once
			menuLink.trigger('click');
			expect(body.hasClass('menu-hidden')).toBe(false);

			//click the menu item again
			menuLink.trigger('click');
			expect(body.hasClass('menu-hidden')).toBe(true);
		});

	});


	describe('Initial Entries', function() {

		/* A test that ensures when the loadFeed
		 * function is called and completes its work, there is at least
		 * a single .entry element within the .feed container.
		 */

		// do this before the test
		beforeEach(function(done) {
			//load feed
			loadFeed(0, done);
		});

		it('should load at least one entry', function() {
			// make sure there is at least one .entry in the DOM
			var entries = $('.feed .entry').length;
			expect(entries).toBeGreaterThan(0);

		});

	});


	describe('New Feed Selection', function() {

		/* A test that ensures when a new feed is loaded
		 * by the loadFeed function that the content actually changes.
		 */

		var initialContent;

		// do this before the test
		beforeEach(function(done) {
			// get content before feed loads
			loadFeed(0, function(){
				initialContent = $('.feed').html();
				// load feed
				loadFeed(1, done);
			});

		});

		it('changes content when feed is loaded', function(){
			// get content after feed loads and compare
			var updatedContent = $('.feed').html();
			expect(updatedContent).not.toBe(initialContent);
		});

	});
}());
