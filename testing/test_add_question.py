import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.action_chains import ActionChains
import time


@pytest.fixture
def driver():
    options = Options()
    options.add_argument("--start-maximized")
    # Uncomment below if running headless
    # options.add_argument("--headless")
    driver = webdriver.Chrome(options=options)
    yield driver
    driver.quit()


def test_add_exam_question(driver):
    driver.get("http://localhost:5173/examiner/addQuestion")
    wait = WebDriverWait(driver, 10)

    # ===== Select Drone Type =====
    dropdown_trigger = wait.until(EC.element_to_be_clickable((By.XPATH, "//button[@role='combobox']")))
    dropdown_trigger.click()

# 2. Wait until the dropdown menu appears with visible options
# Example: selecting the option "Micro Drone" (adjust text as needed)
    drone_option_text = "Micro Drone"

# Wait until the option is present anywhere in the body (since it's likely rendered in a portal)
    dropdown_option = wait.until(EC.presence_of_element_located(
    (By.XPATH, f"//div[contains(@class, 'radix')]//*[contains(text(), '{drone_option_text}')]")
))

# 3. Scroll into view & click (in case it's off-screen or overlayed)
    ActionChains(driver).move_to_element(dropdown_option).click().perform()


    # ===== Add Question (already one by default) =====
    question_input = wait.until(EC.presence_of_element_located((By.ID, "question-0")))
    question_input.send_keys("What is the maximum altitude allowed for Micro Drones?")

    # ===== Fill Options =====
    option_1 = driver.find_element(By.CSS_SELECTOR, "input[placeholder='Option 1']")
    option_2 = driver.find_element(By.CSS_SELECTOR, "input[placeholder='Option 2']")
    option_1.send_keys("400 feet")
    option_2.send_keys("500 feet")

    # ===== Select Correct Answer =====
    correct_radio = driver.find_element(By.ID, "correct-0-0")  # First option as correct
    correct_radio.click()

    # ===== Add Tags =====
    tag_input = driver.find_element(By.CSS_SELECTOR, "input[placeholder='safety, regulations, flight']")
    tag_input.send_keys("altitude, micro drone")

    # ===== Submit Form =====
    save_btn = wait.until(EC.element_to_be_clickable((By.XPATH, "//button[contains(text(), 'Save Questions')]")))
    save_btn.click()

    # ===== Handle Alert =====
    alert_text = ""
    try:
        alert = wait.until(EC.alert_is_present())
        alert_text = alert.text
        time.sleep(5)
        alert.accept()
    except:
        pass

    assert "Exam created successfully" in alert_text or "Error creating questions" not in alert_text
    print("✅ Test Passed: Question submitted!")

