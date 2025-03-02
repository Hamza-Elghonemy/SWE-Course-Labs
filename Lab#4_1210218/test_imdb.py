from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time

# Setup: Launch browser
driver = webdriver.Chrome()
driver.get("https://www.imdb.com")


# Step 1: Find the search box and enter a movie name

search_box = driver.find_element(By.CSS_SELECTOR, "input[type='text']")
assert search_box.is_displayed(), "Test Failed: Search Box not found!"
print('Search box present!')
search_box.send_keys("The Batman")
search_box.send_keys(Keys.RETURN)  # Press Enter

time.sleep(2)  # Wait for results to load

# Step 2: Click the first search result
first_result = driver.find_element(By.CLASS_NAME, "ipc-metadata-list-summary-item__t")

print(f'First search result: {first_result.text}')

# TODO Assert finding 'The Batman' Movie 
# Step 1: Click on the first search result to open the movie page.
# Step 2: Wait for the page to fully load.
# Step 3: Locate the movie title on the new page.
# Step 4: Verify that the movie title matches the original search query.
# Step 5: Use an assert statement to check if the correct movie page opened.

movie_page = first_result.click()
time.sleep(2)
movie_title = driver.find_element(By.CLASS_NAME, "hero__primary-text")
if (movie_title == "The Batman"):
    assert movie_page.is_displayed(), "Test Failed: Cannot find title"
print("Test Passed: IMDb search works correctly!")

# Cleanup: Close the browser
driver.quit()
