FROM oven/bun:1.4.4-debian

USER root

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        bash \
        build-essential \
        git \
        openssh-client \
        curl \
        procps \
        python3 \
        pkg-config \
        unzip \
        xz-utils \
    && rm -rf /var/lib/apt/lists/*

# Set the default shell to bash
SHELL ["/bin/bash", "-euo", "pipefail", "-c"]
RUN usermod --shell /bin/bash bun
ENV SHELL=/bin/bash

USER bun

WORKDIR /var/www/html
