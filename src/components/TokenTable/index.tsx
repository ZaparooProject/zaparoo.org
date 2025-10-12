import React from "react";
import styles from "./styles.module.css";

interface TokenTableProps {
  name: string;
  symbol: string;
  address: string;
  blockchain: string;
  standard: string;
  decimals: string | number;
  totalSupply: string;
  explorerUrl: string;
  explorerName: string;
  domain?: string;
  domainUrl?: string;
  status?: string;
}

export default function TokenTable({
  name,
  symbol,
  address,
  blockchain,
  standard,
  decimals,
  totalSupply,
  explorerUrl,
  explorerName,
  domain,
  domainUrl,
  status = "Supply frozen, not tradeable",
}: TokenTableProps) {
  return (
    <div className={styles.tokenTableContainer}>
      <table className={styles.tokenTable}>
        <tbody>
          <tr>
            <td className={styles.propertyCell}>Token Name</td>
            <td className={styles.valueCell}>{name}</td>
          </tr>
          <tr>
            <td className={styles.propertyCell}>Symbol</td>
            <td className={styles.valueCell}>{symbol}</td>
          </tr>
          <tr>
            <td className={styles.propertyCell}>Address</td>
            <td className={styles.valueCell}>
              <span className={styles.contractAddress}>{address}</span>
            </td>
          </tr>
          {domain && (
            <tr>
              <td className={styles.propertyCell}>Domain</td>
              <td className={styles.valueCell}>
                {domainUrl ? (
                  <a
                    href={domainUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {domain}
                  </a>
                ) : (
                  domain
                )}
              </td>
            </tr>
          )}
          <tr>
            <td className={styles.propertyCell}>Blockchain</td>
            <td className={styles.valueCell}>{blockchain}</td>
          </tr>
          <tr>
            <td className={styles.propertyCell}>Token Standard</td>
            <td className={styles.valueCell}>{standard}</td>
          </tr>
          <tr>
            <td className={styles.propertyCell}>Decimals</td>
            <td className={styles.valueCell}>{decimals}</td>
          </tr>
          <tr>
            <td className={styles.propertyCell}>Total Supply</td>
            <td className={styles.valueCell}>{totalSupply}</td>
          </tr>
          <tr>
            <td className={styles.propertyCell}>Status</td>
            <td className={styles.valueCell}>{status}</td>
          </tr>
          <tr>
            <td className={styles.propertyCell}>Explorer</td>
            <td className={styles.valueCell}>
              <a
                href={explorerUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                View on {explorerName} →
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
