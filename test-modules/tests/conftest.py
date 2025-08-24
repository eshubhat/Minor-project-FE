import pytest
from utils.driver_factory import DriverFactory

def pytest_addoption(parser):
    parser.addoption("--browser", action="store", default="chrome", help="Browser to run tests")
    parser.addoption("--headless", action="store_true", help="Run in headless mode")
    parser.addoption("--base-url", action="store", default="http://localhost:5173", help="Base URL for testing")

@pytest.fixture(scope="session")
def browser(request):
    return request.config.getoption("--browser")

@pytest.fixture(scope="session")
def headless(request):
    return request.config.getoption("--headless")

@pytest.fixture(scope="session")
def base_url(request):
    return request.config.getoption("--base-url")