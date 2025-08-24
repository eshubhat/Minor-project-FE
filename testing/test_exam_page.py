from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time


def test_exam_flow():
    driver = webdriver.Chrome()  # Use Firefox() if preferred
    driver.get("http://localhost:5173/candidate")  # Use your local/dev URL
    driver.maximize_window()
    wait = WebDriverWait(driver, 10)

    # Fill name and email
    wait.until(EC.presence_of_element_located((By.ID, "name"))).send_keys("John Doe")
    email_inputs = driver.find_elements(By.ID, "name")
    email_inputs[1].send_keys("john@example.com")  # 2nd input with same ID

    # Select first drone type
    wait.until(EC.presence_of_all_elements_located((By.CSS_SELECTOR, "button[role='radio']")))[0].click()


    # Start exam
    driver.find_element(By.XPATH, "//button[contains(text(), 'Start Exam')]").click()

    # Answer all questions
    for i in range(10):
        wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, ".text-xl")))
        options = wait.until(EC.presence_of_all_elements_located((By.CSS_SELECTOR, "button[role='radio']")))
        options[0].click()  # select first option

        if i == 9:
            submit_btn = wait.until(EC.presence_of_element_located((By.XPATH, "//button[contains(text(), 'Submit Exam')]")))
            submit_btn.click()
        else:
            next_btn = wait.until(EC.presence_of_element_located((By.XPATH, "//button[contains(text(), 'Next')]")))
            next_btn.click()

    # Confirm redirect
    wait.until(EC.url_contains("/candidate/upload-telemetry"))
    print("✅ Test Passed: Reached telemetry upload page!")

    driver.quit()


if __name__ == "__main__":
    test_exam_flow()
