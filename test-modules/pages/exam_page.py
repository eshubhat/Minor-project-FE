from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import ActionChains
import time

class ExamPage:
    def __init__(self, driver):
        self.driver = driver
        self.wait = WebDriverWait(driver, 10)
    
    # Locators
    NAME_INPUT = (By.ID, "name")
    EMAIL_INPUT = (By.XPATH, "//input[@placeholder='Enter your full name'][2]")  # Second input
    DRONE_RADIO_BUTTONS = (By.XPATH, "//div[@role='radiogroup']//div[contains(@class, 'flex items-center')]")
    START_EXAM_BUTTON = (By.XPATH, "//button[contains(text(), 'Start Exam')]")
    
    # Exam screen locators
    QUESTION_TITLE = (By.XPATH, "//h2[contains(@class, 'text-xl')]")
    ANSWER_OPTIONS = (By.XPATH, "//div[@role='radiogroup']//div[contains(@class, 'flex items-center space-x-2')]")
    NEXT_BUTTON = (By.XPATH, "//button[contains(text(), 'Next')]")
    PREVIOUS_BUTTON = (By.XPATH, "//button[contains(text(), 'Previous')]")
    SUBMIT_BUTTON = (By.XPATH, "//button[contains(text(), 'Submit Exam')]")
    PROGRESS_BAR = (By.XPATH, "//div[contains(@class, 'bg-teal-600 h-2 rounded-full')]")
    
    # Error message locators
    NAME_ERROR = (By.XPATH, "//p[contains(@class, 'text-red-500')][1]")
    EMAIL_ERROR = (By.XPATH, "//p[contains(@class, 'text-red-500')][2]")
    DRONE_TYPE_ERROR = (By.XPATH, "//p[contains(@class, 'text-red-500')][3]")
    
    def navigate_to_exam(self, base_url="http://localhost:5173"):
        """Navigate to the exam page"""
        self.driver.get(f"{base_url}/candidate")
        return self
    
    def fill_candidate_details(self, name="", email=""):
        """Fill candidate name and email"""
        if name:
            name_field = self.wait.until(EC.presence_of_element_located(self.NAME_INPUT))
            name_field.clear()
            name_field.send_keys(name)
        
        if email:
            email_field = self.wait.until(EC.presence_of_element_located(self.EMAIL_INPUT))
            email_field.clear()
            email_field.send_keys(email)
        
        return self
    
    def select_drone_type(self, drone_index=0):
        """Select drone type by index (0-based)"""
        drone_options = self.wait.until(EC.presence_of_all_elements_located(self.DRONE_RADIO_BUTTONS))
        if drone_index < len(drone_options):
            radio_button = drone_options[drone_index].find_element(By.TAG_NAME, "button")
            self.driver.execute_script("arguments[0].click();", radio_button)
        return self
    
    def click_start_exam(self):
        """Click the start exam button"""
        start_button = self.wait.until(EC.element_to_be_clickable(self.START_EXAM_BUTTON))
        start_button.click()
        return self
    
    def get_validation_errors(self):
        """Get all validation error messages"""
        errors = {}
        try:
            name_error = self.driver.find_element(*self.NAME_ERROR)
            errors['name'] = name_error.text
        except:
            pass
        
        try:
            email_error = self.driver.find_element(*self.EMAIL_ERROR)
            errors['email'] = email_error.text
        except:
            pass
            
        try:
            drone_error = self.driver.find_element(*self.DRONE_TYPE_ERROR)
            errors['drone_type'] = drone_error.text
        except:
            pass
        
        return errors
    
    def is_exam_started(self):
        """Check if exam has started (question is visible)"""
        try:
            self.wait.until(EC.presence_of_element_located(self.QUESTION_TITLE))
            return True
        except:
            return False
    
    def get_current_question(self):
        """Get current question text"""
        question_element = self.wait.until(EC.presence_of_element_located(self.QUESTION_TITLE))
        return question_element.text
    
    def get_question_options(self):
        """Get all answer options for current question"""
        options = self.wait.until(EC.presence_of_all_elements_located(self.ANSWER_OPTIONS))
        return [option.find_element(By.TAG_NAME, "label").text for option in options]
    
    def select_answer(self, option_index=0):
        """Select an answer option by index"""
        options = self.wait.until(EC.presence_of_all_elements_located(self.ANSWER_OPTIONS))
        if option_index < len(options):
            radio_button = options[option_index].find_element(By.TAG_NAME, "button")
            self.driver.execute_script("arguments[0].click();", radio_button)
            time.sleep(0.5)  # Small delay for state update
        return self
    
    def click_next(self):
        """Click next button"""
        next_button = self.wait.until(EC.element_to_be_clickable(self.NEXT_BUTTON))
        next_button.click()
        time.sleep(1)  # Wait for question to load
        return self
    
    def click_previous(self):
        """Click previous button"""
        prev_button = self.wait.until(EC.element_to_be_clickable(self.PREVIOUS_BUTTON))
        prev_button.click()
        time.sleep(1)
        return self
    
    def is_previous_disabled(self):
        """Check if previous button is disabled"""
        try:
            prev_button = self.driver.find_element(*self.PREVIOUS_BUTTON)
            return "disabled" in prev_button.get_attribute("class") or prev_button.get_attribute("disabled")
        except:
            return True
    
    def click_submit(self):
        """Click submit exam button"""
        submit_button = self.wait.until(EC.element_to_be_clickable(self.SUBMIT_BUTTON))
        submit_button.click()
        return self
    
    def is_submit_enabled(self):
        """Check if submit button is enabled"""
        try:
            submit_button = self.driver.find_element(*self.SUBMIT_BUTTON)
            return "disabled" not in submit_button.get_attribute("class")
        except:
            return False
    
    def get_progress_percentage(self):
        """Get current progress percentage"""
        try:
            progress_element = self.driver.find_element(*self.PROGRESS_BAR)
            style = progress_element.get_attribute("style")
            # Extract width percentage from style
            if "width:" in style:
                width_str = style.split("width:")[1].split(";")[0].strip()
                return float(width_str.replace("%", ""))
        except:
            pass
        return 0
    
    def complete_exam_with_answers(self, answers_pattern="first"):
        """Complete entire exam with specified answer pattern"""
        question_count = 0
        max_questions = 15  # Safety limit
        
        while question_count < max_questions:
            try:
                # Select answer based on pattern
                if answers_pattern == "first":
                    self.select_answer(0)
                elif answers_pattern == "second":
                    self.select_answer(1)
                elif answers_pattern == "random":
                    import random
                    options = self.get_question_options()
                    self.select_answer(random.randint(0, len(options)-1))
                elif isinstance(answers_pattern, list) and question_count < len(answers_pattern):
                    self.select_answer(answers_pattern[question_count])
                else:
                    self.select_answer(0)
                
                question_count += 1
                
                # Check if this is the last question
                try:
                    submit_button = self.driver.find_element(*self.SUBMIT_BUTTON)
                    if submit_button.is_displayed():
                        self.click_submit()
                        break
                    else:
                        self.click_next()
                except:
                    self.click_next()
                    
            except Exception as e:
                print(f"Error on question {question_count}: {e}")
                break
        
        return question_count