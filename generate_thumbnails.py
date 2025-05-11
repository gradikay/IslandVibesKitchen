
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from time import sleep
import os

# Setup Chrome options
chrome_options = Options()
chrome_options.add_argument("--headless")
chrome_options.add_argument("--no-sandbox")
chrome_options.add_argument("--disable-dev-shm-usage")

# Pages to capture
pages = [
    "index.html",
    "menu.html",
    "about.html",
    "contact.html",
    "meal.html"
]

# Create thumbnails directory
if not os.path.exists("thumbnails"):
    os.makedirs("thumbnails")

try:
    # Desktop screenshots
    driver = webdriver.Chrome(options=chrome_options)
    driver.set_window_size(1920, 1080)

    for page in pages:
        try:
            driver.get(f"http://0.0.0.0:5000/{page}")
            sleep(3)  # Wait longer for content to load
            driver.save_screenshot(f"thumbnails/{page.split('.')[0]}_desktop.png")
            print(f"Created desktop screenshot for {page}")
        except Exception as e:
            print(f"Error capturing desktop screenshot for {page}: {e}")

    # Mobile screenshots
    driver.set_window_size(375, 812)  # iPhone X dimensions

    for page in pages:
        try:
            driver.get(f"http://0.0.0.0:5000/{page}")
            sleep(3)  # Wait longer for content to load
            driver.save_screenshot(f"thumbnails/{page.split('.')[0]}_mobile.png")
            print(f"Created mobile screenshot for {page}")
        except Exception as e:
            print(f"Error capturing mobile screenshot for {page}: {e}")

except Exception as e:
    print(f"Error setting up Chrome driver: {e}")
finally:
    try:
        driver.quit()
    except:
        pass

print("Screenshot process completed!")
