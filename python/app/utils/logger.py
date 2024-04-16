import logging

def setup_logger():
    logging.basicConfig(level=logging.DEBUG)
    logger = logging.getLogger(__name__)

    console_handler = logging.StreamHandler()
    formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
    console_handler.setFormatter(formatter)

    if not logger.handlers:
        logger.addHandler(console_handler)

    return logger
