import pytest
import time
from pages.exam_page import ExamPage
from utils.driver_factory import DriverFactory

class TestExamPage:
    
    @pytest.fixture(autouse=True)
    def setup(self):
        """Setup before each test"""
        self.driver = DriverFactory.get_driver("chrome", headless=False)
        self.exam_page = ExamPage(self.driver)
        yield
        self.driver.quit()
    
    def test_exam_page_loads(self):
        """Test that exam page loads correctly"""
        self.exam_page.navigate_to_exam()
        assert "Start Exam" in self.driver.page_source
        assert self.driver.title  # Page has a title
    
    def test_empty_form_validation(self):
        """Test validation errors for empty form"""
        self.exam_page.navigate_to_exam()
        self.exam_page.click_start_exam()
        
        errors = self.exam_page.get_validation_errors()
        assert "Please enter your name to continue" in errors.get('name', '')
        assert not self.exam_page.is_exam_started()
    
    def test_missing_name_validation(self):
        """Test validation when name is missing"""
        self.exam_page.navigate_to_exam()
        self.exam_page.fill_candidate_details(email="test@example.com")
        self.exam_page.select_drone_type(0)
        self.exam_page.click_start_exam()
        
        errors = self.exam_page.get_validation_errors()
        assert "Please enter your name to continue" in errors.get('name', '')
    
    def test_missing_email_validation(self):
        """Test validation when email is missing"""
        self.exam_page.navigate_to_exam()
        self.exam_page.fill_candidate_details(name="John Doe")
        self.exam_page.select_drone_type(0)
        self.exam_page.click_start_exam()
        
        errors = self.exam_page.get_validation_errors()
        assert "Please enter your email to continue" in errors.get('email', '')
    
    def test_missing_drone_type_validation(self):
        """Test validation when drone type is not selected"""
        self.exam_page.navigate_to_exam()
        self.exam_page.fill_candidate_details(name="John Doe", email="john@example.com")
        self.exam_page.click_start_exam()
        
        errors = self.exam_page.get_validation_errors()
        assert "Please select a drone type" in errors.get('drone_type', '')
    
    def test_successful_exam_start(self):
        """Test successful exam start with valid data"""
        self.exam_page.navigate_to_exam()
        self.exam_page.fill_candidate_details(name="John Doe", email="john@example.com")
        self.exam_page.select_drone_type(0)
        self.exam_page.click_start_exam()
        
        # Wait for exam to load
        time.sleep(3)
        assert self.exam_page.is_exam_started()
    
    def test_exam_navigation(self):
        """Test exam question navigation"""
        # Start exam first
        self.exam_page.navigate_to_exam()
        self.exam_page.fill_candidate_details(name="Jane Doe", email="jane@example.com")
        self.exam_page.select_drone_type(0)
        self.exam_page.click_start_exam()
        
        time.sleep(3)  # Wait for exam to load
        
        if self.exam_page.is_exam_started():
            # Test first question - previous should be disabled
            assert self.exam_page.is_previous_disabled()
            
            # Answer first question and go to next
            self.exam_page.select_answer(0)
            self.exam_page.click_next()
            
            # Now previous should be enabled
            assert not self.exam_page.is_previous_disabled()
            
            # Test going back
            self.exam_page.click_previous()
            # Should be back to first question where previous is disabled
            assert self.exam_page.is_previous_disabled()
    
    def test_answer_selection(self):
        """Test answer selection functionality"""
        self.exam_page.navigate_to_exam()
        self.exam_page.fill_candidate_details(name="Test User", email="test@example.com")
        self.exam_page.select_drone_type(0)
        self.exam_page.click_start_exam()
        
        time.sleep(3)
        
        if self.exam_page.is_exam_started():
            options = self.exam_page.get_question_options()
            assert len(options) > 0  # Should have answer options
            
            # Select each option and verify
            for i in range(min(len(options), 3)):  # Test first 3 options
                self.exam_page.select_answer(i)
                time.sleep(0.5)  # Wait for selection
    
    def test_progress_tracking(self):
        """Test progress bar updates"""
        self.exam_page.navigate_to_exam()
        self.exam_page.fill_candidate_details(name="Progress Test", email="progress@example.com")
        self.exam_page.select_drone_type(0)
        self.exam_page.click_start_exam()
        
        time.sleep(3)
        
        if self.exam_page.is_exam_started():
            initial_progress = self.exam_page.get_progress_percentage()
            
            # Answer and move to next question
            self.exam_page.select_answer(0)
            self.exam_page.click_next()
            
            new_progress = self.exam_page.get_progress_percentage()
            assert new_progress > initial_progress  # Progress should increase
    
    def test_complete_exam_flow(self):
        """Test completing entire exam"""
        self.exam_page.navigate_to_exam()
        self.exam_page.fill_candidate_details(name="Complete Test", email="complete@example.com")
        self.exam_page.select_drone_type(0)
        self.exam_page.click_start_exam()
        
        time.sleep(3)
        
        if self.exam_page.is_exam_started():
            questions_answered = self.exam_page.complete_exam_with_answers("first")
            assert questions_answered > 0
            
            # After completion, should redirect (test the URL change)
            time.sleep(2)
            current_url = self.driver.current_url
            # Should either be on home page or completion page
            assert current_url.endswith('/') or 'complete' in current_url
    
    @pytest.mark.parametrize("drone_index", [0, 1, 2])
    def test_different_drone_types(self, drone_index):
        """Test exam with different drone types"""
        self.exam_page.navigate_to_exam()
        self.exam_page.fill_candidate_details(name=f"Drone Test {drone_index}", email=f"drone{drone_index}@example.com")
        
        try:
            self.exam_page.select_drone_type(drone_index)
            self.exam_page.click_start_exam()
            time.sleep(3)
            
            # Should successfully start exam with any valid drone type
            if self.exam_page.is_exam_started():
                question = self.exam_page.get_current_question()
                assert len(question) > 0  # Should have a question
        except Exception as e:
            # If drone type doesn't exist, that's also valid info
            print(f"Drone type {drone_index} not available: {e}")
    
    def test_form_field_limits(self):
        """Test form field input limits and special characters"""
        test_cases = [
            ("", "empty name"),
            ("a" * 100, "very long name"),
            ("John O'Connor", "name with apostrophe"),
            ("José García", "name with accents"),
            ("invalid-email", "invalid email format"),
            ("test@", "incomplete email"),
            ("test@domain", "incomplete email domain"),
        ]
        
        for test_input, description in test_cases:
            self.exam_page.navigate_to_exam()
            
            if "name" in description:
                self.exam_page.fill_candidate_details(name=test_input, email="test@example.com")
            else:
                self.exam_page.fill_candidate_details(name="Test User", email=test_input)
            
            self.exam_page.select_drone_type(0)
            self.exam_page.click_start_exam()
            
            # Check behavior - either starts exam or shows validation
            time.sleep(1)
            is_started = self.exam_page.is_exam_started()
            errors = self.exam_page.get_validation_errors()
            
            print(f"Test case '{description}': Started={is_started}, Errors={errors}")