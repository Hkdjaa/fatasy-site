from app import App


def main():
    application = App()
    # Run with sensible defaults for local development
    application.run(debug=True, host='127.0.0.1', port=5000)


if __name__ == '__main__':
    main()
